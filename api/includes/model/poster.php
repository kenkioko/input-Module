<?php namespace Api\Includes\Model;

  require_once 'model.php';

  use PDO;
  use ZipArchive;
  use Api\Includes\Model\Model;
  
  class Poster extends Model
  {
      private $storage = __DIR__ .'/../storage';
      
      public function read()
      {
        $output = [];
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM posters ORDER BY id DESC');
        
        $stmt->execute();
        while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
          $row['category'] = $this->get_category($row['category']);
          array_push($output, $row);
        }
        
        return $output;
      }
      
      private function get_category($id)
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM poster_categories WHERE id = :id');
        
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_NAMED);
      }
      
      public function create($data)
      {
        $poster_id = null;
        $error = false;
        $this->db_conn->db_instance()->beginTransaction();
        
        try {
          // insert to `logos`
          $sql = "INSERT INTO posters "
              ."(category, header, title, main, footer, background, email) "
              ."VALUES (:category, :header, :title, :main, :footer, :background, :email)";
          
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          $stmt->bindParam(':category', $category);
          $stmt->bindParam(':header', $header);
          $stmt->bindParam(':title', $title);
          $stmt->bindParam(':main', $main);
          $stmt->bindParam(':footer', $footer);
          $stmt->bindParam(':background', $background);
          $stmt->bindParam(':email', $email);

          $category = intval($data['content']['category']);
          $header = $data['content']['header'];
          $title = $data['content']['title'];
          $main = $data['content']['main'];
          $footer = $data['content']['footer'];
          $background = $data['content']['background'];
          $email = $data['content']['email'];
          if(!$stmt->execute()) {
            $error = true;
          } else {
            $poster_id = $this->db_conn->db_instance()->lastInsertId();
          }
          
          // save images
          if(!empty($_FILES['images'])) {
            $dir = $data['content']['email'] .date('_Y-m-d_His');
            $files = $this->save_files($data['images'], $dir);
            
            $sql = "INSERT INTO poster_images "
                ."(poster_id, dir, files) "
                ."VALUES (:poster_id, :dir, :files)";
            
            $stmt = $this->db_conn->db_instance()->prepare($sql);
            $stmt->bindParam(':poster_id', $poster_id);
            $stmt->bindParam(':dir', $dir);
            $stmt->bindParam(':files', json_encode($files));
            if(!$stmt->execute()) {
              $error = true;
            }
          }
          
          if($error){
            $this->db_conn->db_instance()->rollBack();
            return null;
          }
        } catch (Exception $e) {
          $this->db_conn->db_instance()->rollBack();
          
          $error_msg = 'Error writing to database!';
          if ($_ENV['DEBUG'] == 'true') {
            $error_msg = $e->getMessage();
          } 
          
          $this->server_reply([
            'message' => $error_msg,
          ], 500);
        }
        
        $this->db_conn->db_instance()->commit();
        return ['id' => $poster_id];
      }
      
      private function save_files($files, $dir)
      {
          $dir = $this->storage .'/' .$dir;
          mkdir($dir, 0755);
          $uploaded = [];
          
          foreach ($files as $index => $file) {
            move_uploaded_file(
              $file['tmp_name'],
              $dir .'/' .$file['name']
            );
            
            array_push($uploaded, $file['name']);
          }
          
          return $uploaded;
      }
      
      public function get($id)
      {
          $sql = 'SELECT * FROM posters WHERE id = :id';
          $stmt = $this->db_conn->db_instance()->prepare($sql);                    
          
          $stmt->bindParam(':id', $id);
          $stmt->execute();
          $poster = $stmt->fetch(PDO::FETCH_NAMED);
          
          // poster images
          $sql = 'SELECT dir, files FROM poster_images WHERE poster_id = :poster_id';
          $stmt = $this->db_conn->db_instance()->prepare($sql);                    
          
          $stmt->bindParam(':poster_id', $poster['id']);
          $stmt->execute();
          $images = $stmt->fetch(PDO::FETCH_NAMED);
          
          //zip img files
          $images = $this->zip_image_files($images);
          $poster['images'] = $images;
          
          return $poster;
      }
      
      private function zip_image_files($images)
      {
          $file_dir = $this->storage .'/' .$images['dir'];
          $filename = $images['dir'] . '.zip';

          if (!file_exists($file_dir .'/' .$filename)) {
            $zip = new ZipArchive();
            if ($zip->open(
                  $file_dir .'/' .$filename, 
                  ZipArchive::CREATE 
                ) !== true
            ){
              $this->server_reply([
                'message' => 'cannot open ' .$filename .'!',
              ], 500);
            }

            $files = json_decode($images['files']);
            foreach ($files as $index => $value) {
              $zip->addFile($file_dir .'/' .$value, $value);
            }

            $zip->close();
          }

          $images['zip'] = $file_dir .'/' .$filename;
          return $images;
      }
  }
  

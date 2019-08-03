<?php namespace Api\Includes\Model;

  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class Poster extends Model
  {
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
        $r_id = null;
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

          $category = intval($data['category']);
          $header = $data['header'];
          $title = $data['title'];
          $main = $data['main'];
          $footer = $data['footer'];
          $background = $data['background'];
          $email = $data['email'];
          if(!$stmt->execute()) {
            $error = true;
          } else {
            $r_id = $this->db_conn->db_instance()->lastInsertId();
          }
          
          /*// insert to chosen_item
          $sql = "INSERT INTO chosen_items "
              ."(logo_id, item_id) "
              ."VALUES (:logo_id, :item_id)";
          
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          $stmt->bindParam(':logo_id', $logo_id);
          $stmt->bindParam(':item_id', $item_id);
          
          // font_type
          foreach ($data['font_type'] as $key => $value) {
            $logo_id = intval($r_id);
            $item_id = intval($value);
            
            if(!$stmt->execute()) {
              $error = true;
            }
          }

          // logo_type
          foreach ($data['logo_type'] as $key => $value) {
            $logo_id = intval($r_id);
            $item_id = intval($value);
            if(!$stmt->execute()) {
              $error = true;
            }
          }
          
          if($error){
            $this->db_conn->db_instance()->rollBack();
            return null;
          } */    
        } catch (Exception $e) {
          $this->db_conn->db_instance()->rollBack();
          
          $error_msg = 'Error writing to database';
          if ($_ENV['DEBUG'] == 'true') {
            $error_msg = $e->getMessage();
          } 
          
          $this->server_reply([
            'message' => $error_msg,
          ], 500);
        }
        
        $this->db_conn->db_instance()->commit();
        return ['id' => $r_id];
      }
  }
  

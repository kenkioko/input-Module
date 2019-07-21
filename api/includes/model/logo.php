<?php namespace Api\Includes\Model;

  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class Logo extends Model
  {
      public $logo_text = [];
      public $font_type = [];
      public $logo_type = [];
      
      public function read()
      {        
        $output = [];
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM logos');                    
        
        $stmt->execute();
        while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
          $row['category'] = $this->get_category($row['category']);
          $row['logo_items'] = $this->get_logo_items($row['id']);
          array_push($output, $row);
        }
        
        return $output;
      }
      
      private function get_category($id)
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM logo_categories WHERE id = :id');                    
        
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_NAMED);
      }
      
      private function get_logo_items($logo_id)
      {
        $output = [];
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT id, item_id FROM chosen_items WHERE logo_id = :logo_id');                    
        
        $stmt->bindParam(':logo_id', $logo_id);
        $stmt->execute();
        while ($row = $stmt->fetch(PDO::FETCH_NAMED)) {
          array_push($output, $this->get_item($row['item_id']));
        }
        
        return $output;
      }
      
      private function get_item($id)
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT id, name, description, type FROM logo_items WHERE id = :id');                    
        
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
          $sql = "INSERT INTO logos "
              ."(category, line_1, line_2, type, email) "
              ."VALUES (:category, :line_1, :line_2, :type, :email)";
          
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          $stmt->bindParam(':category', $category);
          $stmt->bindParam(':line_1', $line_1);
          $stmt->bindParam(':line_2', $line_2);
          $stmt->bindParam(':type', $type);
          $stmt->bindParam(':email', $customer_email);

          $category = intval($data['logo_text']['category']);
          $line_1 = $data['logo_text']['line_1'];
          $line_2 = $data['logo_text']['line_2'];
          $type = $data['logo_text']['type'];
          $customer_email = $data['customer_email'];
          if(!$stmt->execute()) {
            $error = true;
          } else {
            $r_id = $this->db_conn->db_instance()->lastInsertId();
          }
          
          // insert to chosen_item
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
          }          
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
  

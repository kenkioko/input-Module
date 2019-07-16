<?php namespace Api\Includes\Model;

  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class LogoRequest extends Model
  {
      public $logo_text = [];
      public $font_type = [];
      public $logo_type = [];
      
      public function read()
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM logo_requests');                    
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_NAMED|PDO::FETCH_CLASS);
      }
      
      public function create($data)
      {
        $r_id = null;
        $error = false;
        $this->db_conn->db_instance()->beginTransaction();
        
        try {
          // insert to logo_requests
          $sql = "INSERT INTO logo_requests "
              ."(category, line_1, line_2, type) "
              ."VALUES (:category, :line_1, :line_2, :type)";
          
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          $stmt->bindParam(':category', $category);
          $stmt->bindParam(':line_1', $line_1);
          $stmt->bindParam(':line_2', $line_2);
          $stmt->bindParam(':type', $type);

          $category = intval($data['logo_text']['category']);
          $line_1 = $data['logo_text']['line_1'];
          $line_2 = $data['logo_text']['line_2'];
          $type = $data['logo_text']['type'];
          if(!$stmt->execute()) {
            $error = true;
          } else {
            $r_id = $this->db_conn->db_instance()->lastInsertId();
          }
          
          // insert to chosen_item
          $sql = "INSERT INTO chosen_items "
              ."(request_id, item_id) "
              ."VALUES (:request_id, :item_id)";
          
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          $stmt->bindParam(':request_id', $request_id);
          $stmt->bindParam(':item_id', $item_id);
          
          // font_type
          foreach ($data['font_type'] as $key => $value) {
            $request_id = intval($r_id);
            $item_id = intval($value);
            if(!$stmt->execute()) {
              $error = true;
            }
          }

          // logo_type
          foreach ($data['logo_type'] as $key => $value) {
            $request_id = intval($r_id);
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
  

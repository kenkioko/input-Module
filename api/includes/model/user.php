<?php namespace Api\Includes\Model;

  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class User extends Model
  {
      public function get($user)
      {        
          $sql = 'SELECT * FROM users WHERE username = :user';
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          
          $stmt->bindParam(':user', $user);
          $stmt->execute();
          
          return $stmt->fetch(PDO::FETCH_NAMED);
      }
      
      public function create($data)
      {        
          $r_id = null;
          try {
            $password = password_hash($data['password'],  PASSWORD_DEFAULT);
            
            $sql = 'INSERT INTO users (username, password) '
                  .'VALUES (:username, :password)';
            
            $stmt = $this->db_conn->db_instance()->prepare($sql);
            $stmt->bindParam(':username', $data['username']);
            $stmt->bindParam(':password', $password);
            
            $stmt->execute();
            $r_id = $this->db_conn->db_instance()->lastInsertId();
          } catch (Exception $e) {
            $error_msg = 'Error writing to database!';
            if ($_ENV['DEBUG'] == 'true') {
              $error_msg = $e->getMessage();
            } 
            
            $this->server_reply([
              'message' => $error_msg,
            ], 500);
          }
          
          return ['id' => $r_id];
      }
      
      public function read()
      {
          $sql = 'SELECT id, username FROM users';
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          $stmt->execute();
          return $stmt->fetchAll(PDO::FETCH_NAMED);
      }
      
      public function delete($id)
      {
          $sql = 'DELETE FROM users WHERE id = :id';
          $stmt = $this->db_conn->db_instance()->prepare($sql);
          
          $stmt->bindParam(':id', $id);
          return $stmt->execute();
      }
  }
  

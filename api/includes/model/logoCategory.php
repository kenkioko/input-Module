<?php namespace Api\Includes\Model;
  
  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class LogoCategory extends Model
  {
      public $id = null;
      public $category = null;
      
      public function read()
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM logo_categories ORDER BY category ASC');                    
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_NAMED|PDO::FETCH_CLASS);
      }
  }

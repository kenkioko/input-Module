<?php namespace Api\Includes\Model;
  
  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class LogoItem extends Model
  {
      public $id = null;
      public $name = null;
      public $description = null;
      public $image_src = null;
      public $img_alt = null;
      public $type = null;
      
      public function read()
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM logo_items');                    
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_NAMED|PDO::FETCH_CLASS);
      }
  }

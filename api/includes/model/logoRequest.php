<?php namespace Api\Includes\Model;

  require_once 'model.php';

  use PDO;
  use Api\Includes\Model\Model;
  
  class LogoRequest extends Model
  {
      public $logo_text = [];
      public $font_type = [];
      public $logo_type = [];
      //$textErr = $fontErr = $logoErr = '';
      
      public function read()
      {
        $stmt = $this->db_conn->db_instance()
            ->prepare('SELECT * FROM logo_requests');                    
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_NAMED|PDO::FETCH_CLASS);
      }
      
      public function create()
      {
          # code...
      }
  }

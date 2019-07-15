<?php namespace Api\Includes;
  
  require_once __DIR__ . '/../vendor/autoload.php';
  require_once 'reply.php';
    
  use PDO;
  use PDOException;
  use Dotenv\Dotenv;
  use Api\Includes\ServerReply;
  
  $dotenv = Dotenv::create(__DIR__ . '/../');
  $dotenv->load();

  class Connection
  {
    use ServerReply;
    
    private $dbh = null;
    private $host = '';
    private $dbname = '';
    private $user = '';
    private $pass = '';
    
    function __construct()
    {
      $this->host = $_ENV['DB_HOST'];
      $this->dbname = $_ENV['DB_NAME'];
      $this->user = $_ENV['DB_USER'];
      $this->pass = $_ENV['DB_PASS'];
      
      $this->db_connect();
    }
    
    public function db_connect()
    {
      try {
        $connect = 'mysql:'
            .'host=' .$this->host .';' 
            .'dbname=' .$this->dbname;

        $this->dbh = new PDO($connect, $this->user, $this->pass);
      } catch (PDOException $e) {
        $error_msg = 'Database connection failed';
        if ($_ENV['DEBUG'] == 'true') {
          $error_msg = $e->getMessage();
        } 
        
        $this->server_reply([
          'message' => $error_msg,
        ], 500);
      }
    }
    
    public function db_instance()
    {
      return $this->dbh;
    }
    
    public function db_close() {
      $this->dbh = null;
    }
    
    function __destruct() {
      $this->db_close();
    }
  }


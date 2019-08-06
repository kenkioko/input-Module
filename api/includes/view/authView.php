<?php namespace Api\Includes\View;

  require_once __DIR__ .'/../model/user.php';
  
  use Api\Includes\Model\User;
  
  class AuthView extends View
  {
      public $username = '';
      public $password = '';
      
      public function authenticate()
      {
        $user = new User;
        $authenticated = false;
        
        if(!empty($_SERVER['PHP_AUTH_USER'])){
          $this->username = $_SERVER['PHP_AUTH_USER'];
        }
        
        if(!empty($_SERVER['PHP_AUTH_PW'])){
          $this->password = $_SERVER['PHP_AUTH_PW'];
        }

        $pass_hash = $user->get($this->username)['password'];
        $authenticated = password_verify($this->password, $pass_hash);
        
        if(!$authenticated){
          $this->server_reply([
            'message' => 'You are not unauthorized to view this page!',
          ], 401);
        }
      }
  }
  

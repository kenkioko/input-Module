<?php namespace Api\Includes\View;

  require_once __DIR__ .'/../model/user.php';
  
  use Api\Includes\Model\User;
  
  class AuthView extends View
  {
      public function authenticate()
      {
        $user = new User;
        $authenticated = false;
        $username = $_SERVER['PHP_AUTH_USER'];
        $password = $_SERVER['PHP_AUTH_PW'];
        
        if (isset($username)) {
          $pass_hash = $user->get($username)['password'];
          $authenticated = password_verify($password, $pass_hash);
        }
        
        if(!$authenticated){
          $this->server_reply([
            'message' => 'You are not unauthorized to view this page!',
          ], 401);
        }
      }
  }
  

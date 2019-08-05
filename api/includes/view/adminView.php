<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once 'authView.php';
  
  use Api\Includes\View\View;
  use Api\Includes\View\AuthView;
  
  class AdminView extends View
  {
      function __construct()
      {
          //Authenticate
          $auth = new AuthView;
          $auth->authenticate();
      }
      
      protected function get()
      {   
          $this->server_reply([
            'message' => 'login success!',
          ]);
      }

  }
  

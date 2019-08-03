<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once __DIR__ .'/../model/poster.php';
  require_once __DIR__ .'/../model/user.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\Poster;
  use Api\Includes\Model\User;
  
  class PosterView extends View
  {
      private $category = null;
      
      function __construct()
      {
          $this->model = new Poster;
      }
      
      protected function get()
      {   
          //Authenticate
          $auth = new AuthView;
          $auth->authenticate();
          
          $result = $this->model->read();
          $this->server_reply($result);
      }
      
      protected function post()
      {
          $this->validate_post_data();
          
          $create = $this->model->create($_POST);

          $message = 'Request successful';
          $code = 200;
          if (!$create || !isset($create['id'])) {
            $message = 'There was an error while making the request';
            $code = 400;
          }

          $this->server_reply([
            'message' => $message,
          ], $code);
      }
      
      private function validate_post_data()
      {
          $error = false;
          $error_found = [];
          
          if (empty($_POST["category"])) {
            $error = true;
            array_push($error_found, [
              'category' => 'poster category is required'
            ]);
          }
          
          if (empty($_POST["email"])) {
            $error = true;
            array_push($error_found, [
              'email' => 'customer email is required'
            ]);
          }
          
          if($error){
            $this->server_reply([
              'message' => 'There were errors found',
              'errors' => $error_found
            ], 400);
          }
      }
  }
  

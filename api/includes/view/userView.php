<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once 'authView.php';
  require_once __DIR__ .'/../model/user.php';  
  
  use Api\Includes\View\View;
  use Api\Includes\Model\User;
  use Api\Includes\View\AuthView;
  
  class UserView extends View
  {
      private $auth = null;
      
      function __construct()
      {
          $this->model = new User;

          //Authenticate          
          $this->auth = new AuthView;
          $this->auth->authenticate();
      }
      
      protected function get()
      {
          $result = $this->model->read();
          $this->server_reply($result);
      }
      
      protected function post()
      {
          $this->validate_user();
          $create = $this->model->create($_POST);

          $message = 'Request successful!';
          $code = 201;
          if (!$create || !isset($create['id']) || $create['id'] == 0) {
            $message = 'There was an error while making the request!';
            $code = 400;
          }

          $this->server_reply([
            'message' => $message,
          ], $code);
      }
      
      private function validate_user()
      {
          $error = false;
          $error_found = [];
          
          if (empty($_POST["username"])) {
            $error = true;
            $error_found['username'] = 'username is required!';
          }
          
          if (empty($_POST["password"])) {
            $error = true;
            $error_found['password'] = 'password is required!';
          }
          
          if($error) {
            $this->server_reply([
              'message' => 'There were errors found!',
              'errors' => $error_found
            ], 400);
          }
      }
      
      protected function delete()
      {
          if (empty($_GET['id'])) {
            $this->server_reply([
              'message' => 'User id not found!',
            ], 400);
          }
          
          $username = $this->auth->username;
          if($this->model->get($username)['id'] == $_GET['id']){
            $this->server_reply([
              'message' => 'Cannot delete this user "' .$username .'"!',
            ], 400);
          }
          
          $delete = $this->model->delete($_GET['id']);
          $message = 'Delete successful!';
          $code = 200;
          if (!$delete) {
            $message = 'There was an error while making the request!';
            $code = 400;
          }

          $this->server_reply([
            'message' => $message,
          ], $code);
      }

  }
  

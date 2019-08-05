<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once 'authView.php';
  require_once __DIR__ .'/../model/logo.php';  
  
  use Api\Includes\View\View;
  use Api\Includes\Model\Logo;
  use Api\Includes\View\AuthView;
  
  class LogoView extends View
  {
      private $logo_text = [];
      private $font_type = [];
      private $logo_type = [];
      private $customer_email = '';
      
      function __construct()
      {
          $this->model = new Logo;
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
        $this->post_form_data();
        $this->validate_logo_text($this->logo_text);
        $this->validate_font_type($this->font_type);
        $this->validate_logo_type($this->logo_type);
        
        $create = $this->model->create([
          'logo_text' => $this->logo_text,
          'font_type' => $this->font_type,
          'logo_type' => $this->logo_type,
          'customer_email' => $this->customer_email
        ]);

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

      /*
       * get the form data from post, submitted as json
       */
      private function post_form_data()
      {
        $error = false;
        $error_found = [];
        
        if (empty($_POST["logo_text"])) {
          $error = true;
          array_push($error_found, ['logo_text' => 'logo text is required!']);
        } else {
          $this->logo_text = json_decode($_POST["logo_text"], true);
        }
        
        if (empty($_POST["font_type"])) {
          $error = true;
          array_push($error_found, ['font_type' => 'font type is required!']);
        } else {
          $this->font_type = json_decode($_POST["font_type"]);
          
        }
        
        if (empty($_POST["logo_type"])) {
          $error = true;
          array_push($error_found, ['logo_type' => 'logo type is required!']);
        } else {
          $this->logo_type = json_decode($_POST["logo_type"]);
        }
        
        if (empty($_POST["customer_email"])) {
          $error = true;
          array_push($error_found, ['customer_email' => 'customer email is required!']);
        } else {
          $this->customer_email = $_POST["customer_email"];
        }
        
        if($error) {
          $this->server_reply([
            'message' => 'There were errors found!',
            'errors' => $error_found
          ], 400);
        }
      }
      
      private function validate_logo_text($data)
      {
        $error = false; 
        $error_found = [];
       
        if (empty($data['category'])) {
          $error = true;
          array_push($error_found, ['category' => 'category is required!']);
        }
        
        if (empty($data['line_1'])) {
          $error = true;
          array_push($error_found, ['line_1' => 'line 1 is required!']);
        }
        
        if($error) {
          $this->server_reply([
            'message' => 'There were errors found!',
            'errors' => [
              'logo_text' => $error_found
            ]
          ], 400);
        }
      }
      
      private function validate_font_type($data)
      {
        $error = false; 
        $error_found = [];
        
        if (empty($data)) {
          $error = true;
          $this->server_reply([
            'message' => 'There were errors found!',
            'errors' => [
              'font_type' => 'Please choose a font type!'
            ]
          ], 400);
        }
      }
      
      private function validate_logo_type($data)
      {
        $error = false; 
        $error_found = [];
        
        if (empty($data)) {
          $error = true;
          $this->server_reply([
            'message' => 'There were errors found!',
            'errors' => [
              'logo_type' => 'Please choose a logo type!'
            ]
          ], 400);
        }
      }
  }
  

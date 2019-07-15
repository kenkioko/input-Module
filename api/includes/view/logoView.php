<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once __DIR__ .'/../model/logoRequest.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\LogoRequest;
  
  class LogoView extends View
  {
      function __construct()
      {
          $this->model = new LogoRequest;
      }
      
      protected function get()
      {
          $result = $this->model->read();
          $this->server_reply($result);
      }
      
      protected function post()
      {
        $this->post_form_data();
        
        $this->server_reply([
          'logo_text' => $GLOBALS['logo_text'],
          'font_type' => $GLOBALS['font_type'],
          'logo_type' => $GLOBALS['logo_type'],
        ], 200);
      }
      
      /*
       * get the form data from post, submitted as json
       */
      private function post_form_data()
      {
        if (empty($_POST["logo_text"])) {
          $GLOBALS['textErr'] = "logo text is required";
        } else {
          $GLOBALS['logo_text'] = json_decode($_POST["logo_text"], true);
        }
        
        if (empty($_POST["font_type"])) {
          $GLOBALS['fontErr'] = "font type is required";
        } else {
          $GLOBALS['font_type'] = json_decode($_POST["font_type"], true);
        }
        
        if (empty($_POST["logo_type"])) {
          $GLOBALS['logoErr'] = "logo type is required";
        } else {
          $GLOBALS['logo_type'] = json_decode($_POST["logo_type"], true);
        }
      }
  }

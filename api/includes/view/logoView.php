<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once __DIR__ .'/../model/logoRequest.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\LogoRequest;
  
  class LogoView extends View
  {
      private $logo_text = [];
      private $font_type = [];
      private $logo_type = [];
      private $textErr = '';
      private $fontErr = '';
      private $logoErr = '';
      
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
          'logo_text' => $this->logo_text,
          'font_type' => $this->font_type,
          'logo_type' => $this->logo_type,
        ], 200);
      }
      
      /*
       * get the form data from post, submitted as json
       */
      private function post_form_data()
      {
        if (empty($_POST["logo_text"])) {
          $this->textErr = "logo text is required";
        } else {
          $this->logo_text = json_decode($_POST["logo_text"], true);
        }
        
        if (empty($_POST["font_type"])) {
          $this->fontErr = "font type is required";
        } else {
          $this->font_type = json_decode($_POST["font_type"], true);
        }
        
        if (empty($_POST["logo_type"])) {
          $this->logoErr = "logo type is required";
        } else {
          $this->logo_type = json_decode($_POST["logo_type"], true);
        }
      }
  }
  

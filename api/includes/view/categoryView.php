<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once __DIR__ .'/../model/logoCategory.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\LogoCategory;
  
  class CategoryView extends View
  {
      function __construct()
      {
          $this->model = new LogoCategory;
      }
      
      protected function get()
      {
          $result = $this->model->read();
          $this->server_reply($result);
      }
  }

<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once __DIR__ .'/../model/logoItem.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\LogoItem;
  
  class ItemView extends View
  {
      function __construct()
      {
          $this->model = new LogoItem;
      }
      
      protected function get()
      {
          $result = $this->model->read();
          $this->server_reply($result);
      }
  }

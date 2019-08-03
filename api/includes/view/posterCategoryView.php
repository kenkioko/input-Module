<?php namespace Api\Includes\View;

  require_once 'view.php';
  require_once __DIR__ .'/../model/posterCategory.php';
  
  use Api\Includes\View\View;
  use Api\Includes\Model\PosterCategory;
  
  class PosterCategoryView extends View
  {
      function __construct()
      {
          $this->model = new PosterCategory;
      }
      
      protected function get()
      {
          $result = $this->model->read();
          $this->server_reply($result);
      }
  }

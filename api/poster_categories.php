<?php namespace Api;

  require_once 'includes/view/posterCategoryView.php';
  
  use Api\Includes\View\PosterCategoryView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new PosterCategoryView;
  $view->show_view();
?>


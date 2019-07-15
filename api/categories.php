<?php namespace Api;

  require_once 'includes/view/categoryView.php';
  
  use Api\Includes\View\CategoryView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new CategoryView;
  $view->show_view();
?>


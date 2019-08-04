<?php namespace Api;

  require_once 'includes/view/adminView.php';
  
  use Api\Includes\View\AdminView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new AdminView;
  $view->show_view();  
?>


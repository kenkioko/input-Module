<?php namespace Api;

  require_once 'includes/view/userView.php';
  
  use Api\Includes\View\UserView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new UserView;
  $view->show_view();  
?>


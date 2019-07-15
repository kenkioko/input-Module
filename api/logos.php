<?php namespace Api;

  require_once 'includes/view/logoView.php';
  
  use Api\Includes\View\LogoView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new LogoView;
  $view->show_view();  
?>


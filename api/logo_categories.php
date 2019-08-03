<?php namespace Api;

  require_once 'includes/view/logoCategoryView.php';
  
  use Api\Includes\View\LogoCategoryView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new LogoCategoryView;
  $view->show_view();
?>


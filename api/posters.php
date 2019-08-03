<?php namespace Api;

  require_once 'includes/view/posterView.php';
  
  use Api\Includes\View\PosterView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new PosterView;
  $view->show_view();
?>


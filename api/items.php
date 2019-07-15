<?php namespace Api;

  require_once 'includes/view/itemView.php';
  
  use Api\Includes\View\ItemView;

  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Origin: *");

  $view = new ItemView;
  $view->show_view();
?>


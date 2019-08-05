<?php
  require_once __DIR__ . '/vendor/autoload.php';
  
  use Dotenv\Dotenv;
  
  // Read .env
  try {
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
    $dotenv->required([
      'DEBUG',
      'DB_HOST',
      'DB_NAME',
      'DB_USER',
      'DB_PASS'
    ])->notEmpty();
  } catch (Exception $e) {
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Origin: *");
    http_response_code(500);
    echo json_encode([
      'message' => 'Unable to process the environment file(s)!',
    ]);
    exit();
  }

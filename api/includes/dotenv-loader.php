<?php
  require_once __DIR__ . '/vendor/autoload.php';
  
  use Dotenv\Dotenv;
  
  // Read .env
  try {
    $dotenv = Dotenv::create(__DIR__);
    $dotenv->load();
  } catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
      'message' => 'Unable to read any of the environment file(s)!',
    ]);
    exit();
  }

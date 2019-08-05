<?php namespace Api\Includes;
  
  trait ServerReply {
      /*
       * server reply
       */
      protected function server_reply($reply_data, $status_code = 200)
      {
        http_response_code($status_code);
        echo json_encode($reply_data);
        exit();
      }
      
      /*
       * server output file
       */
      protected function output_file($file_url)
      {
          if (file_exists($file_url)) {
            header('Content-Description: File Transfer');
            header('Content-Type: application/zip');
            header(
              'Content-Disposition: attachment; filename="'
              .basename($file_url)
              .'"'
            );
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($file_url));
            readfile($file_url);
            exit;
          } else {
            $this->server_reply([
              'message' => 'output file not found!'
            ], 500);
          }
      }
  }

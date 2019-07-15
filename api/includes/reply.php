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
  }

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();                                            // Set mailer to use SMTP
    $mail->Host = 'smtp.gmail.com';                               // Set the SMTP server to Gmail
    $mail->SMTPAuth = true;                                       // Enable SMTP authentication
    $mail->Username = 'sarojbhandari646@gmail.com';               // SMTP username
    $mail->Password = 'SarojBhandari@890';                        // SMTP password (use your Gmail password or app password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;           // Enable TLS encryption
    $mail->Port = 587;                                            // TCP port for TLS

    // Recipients
    $mail->setFrom('sarojbhandari646@gmail.com', 'Your Name');     // Your Gmail address
    $mail->addAddress('receiver@example.com', 'Receiver Name');    // Recipient's email address

    // Content
    $mail->isHTML(true);                                          // Set email format to HTML
    $mail->Subject = 'Contact Form Message';
    $mail->Body    = 'This is the message content from the contact form.';
    $mail->AltBody = 'This is the plain text version of the message.';

    $mail->send();                                                // Send the email
    echo 'Message has been sent successfully.';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>

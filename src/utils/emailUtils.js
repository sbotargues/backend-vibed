const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (email, username) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"VIBED" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "¡Bienvenido a VIBED!",
    html: `
      <div
      style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        font-family: 'Arial', sans-serif;
        font-size: 16px;
        border-radius: 10px;
      "
    >
      <div style="text-align: center; margin-bottom: 20px">
        <img
          src="https://vibed.s3.us-east-2.amazonaws.com/logonegro.png"
          alt="Logo de VIBED"
          style="max-width: 200px; border-radius: 10px"
        />
      </div>
      <h1 style="color: #fff; text-align: center">
        ¡Bienvenido a VIBED, ${username}!
      </h1>
      <br />
      <div style="color: #fff; text-align: center">
        <p>
          Nos alegra mucho contar contigo y queremos trasladarte un cálido saludo a
          nuestra vibrante comunidad musical.
        </p>
        <p>
          Queremos que disfrutes al máximo tu experiencia en nuestra plataforma, y
          para asegurarnos de que tu perfil destaque, te dejamos aquí algunos
          consejos:
        </p>
        <br />
        <div style="line-height: 1.5">
          <b>Completa tu perfil:</b> Asegúrate de completar todos los detalles en tu
          perfil, incluyendo tu estilo musical, enlaces a tus redes sociales y tus
          fees.
        </div>
        <div style="line-height: 1.5">
          <b>Carga tu música:</b> Comparte tus mezclas y pistas originales para que
          otros miembros de VIBED puedan descubrir tu talento.
        </div>
        <div style="line-height: 1.5">
          <b>Participa en la comunidad: </b>Comparte tus experiencias y establece
          contactos con los demás integrantes.
        </div>
        <br />
        <p>
          ¡Y eso es solo el comienzo! Si necesitas ayuda o tienes alguna pregunta,
          no dudes en ponerte en contacto con nosotros.
        </p>
      </div>
      <br />
      <p style="text-align: center">
        Que tengas una bonita experiencia musical, juntos esperamos hacer de este
        ecosistema un lugar increíble para todos los amantes de la música.
      </p>
      <p style="text-align: center">
        ¡Y si no lo has hecho aún, no te olvides de seguirnos en nuestras redes
        sociales!
      </p>
      <p style="text-align: center">Gracias de nuevo.</p>
      <p style="text-align: center">Un abrazo,</p>
    </div>  
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const sendWelcomeEmailBusiness = async (email, username) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"VIBED" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "¡Bienvenido a VIBED!",
    html: `
      <div
      style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        font-family: 'Arial', sans-serif;
        font-size: 16px;
        border-radius: 10px;
      "
    >
      <div style="text-align: center; margin-bottom: 20px">
        <img
          src="https://vibed.s3.us-east-2.amazonaws.com/logonegro.png"
          alt="Logo de VIBED"
          style="max-width: 200px; border-radius: 10px"
        />
      </div>
      <h1 style="color: #fff; text-align: center">
        ¡Bienvenido a VIBED, ${username}!
      </h1>
      <div style="color: #fff; text-align: center">
        <p>
          Nos alegra mucho contar contigo y queremos trasladarte un cálido saludo a
          nuestra vibrante comunidad musical.
        </p>
        <p>
          Nuestro objetivo es garantizar que aproveches al máximo tu experiencia en
          nuestra plataforma. Para asegurarnos de que tu perfil destaque y sea
          atractivo en nuestra comunidad, te dejamos aquí algunos consejos:
        </p>
        <br />
          <div style="line-height: 1.5">
            <b>Descubre nuevos talentos:</b> Explora nuestra selección de DJs y descubre
            sonidos frescos que con los que podrás ambientar cualquier fiesta.
          </div>
          <div style="line-height: 1.5">
          <b>Gestiona tus eventos:</b> Utiliza nuestras herramientas de gestión de
            eventos para organizar tus actuaciones y mantener tu programación bajo
            control.
          </div>
          <div style="line-height: 1.5">
          <b>Conéctate con otros miembros:</b> Comparte tus experiencias y establece
            contactos con otros miembros de VIBED.
          </div>
        <p>
          ¡Y eso es solo el comienzo! Si necesitas ayuda o tienes alguna pregunta,
          no dudes en ponerte en contacto con nosotros.
        </p>
      </div>
      <p style="color: #fff; text-align: center">
        Que tengas una bonita experiencia musical, juntos esperamos hacer de este
        ecosistema un lugar increíble para todos los amantes de la música.
      </p>
      <p style="color: #fff; text-align: center">
        ¡Estamos impacientes por llevar la gestión de tus eventos al siguiente
        nivel!
      </p>
      <p style="color: #fff; text-align: center">
        ¡Y si no lo has hecho aún, no te olvides de seguirnos en nuestras redes
        sociales!
      </p>
      <p style="color: #fff; text-align: center">Gracias de nuevo.</p>
      <p style="color: #fff; text-align: center">Un abrazo,</p>
    </div>  
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

module.exports = { sendWelcomeEmail, sendWelcomeEmailBusiness };

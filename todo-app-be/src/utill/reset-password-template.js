export const resetPasswordTemplate = (username, resetToken) => {
  return `
<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
<!--100% body table-->
<table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
  <tr>
      <td>
          <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
              align="center" cellpadding="0" cellspacing="0">
              <tr>
                  <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
                  <td>
                      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                          style="text-align:center; max-width:670px;background:#fff; border-radius:3px; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                          <tr>
                              <td style="height:20px; text-align:left; padding:15px 35px">Hello ${username},</td>
                          </tr>
                          
                          <tr>
                              <td style="padding:0 35px;">
                                  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif; text-align:center;">You have
                                      requested to reset your password</h1>
                                  <span
                                      style=" display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px; "></span>
                                  <p style="text-align:left; color:#455056; font-size:15px;line-height:24px; margin:0;">
                                     We received a request to reset your password for your account. If you did not request this change, please ignore this email. Otherwise, please use the following reset token to reset your password.
                                  </p>
                                  <table style="table-layout: fixed; width: 100%; margin:10px 0" >
                                      <tr>
                                          <td style="vertical-align: top;width: 20%;">Reset Token:</td>
                                          <td style="word-wrap: break-word; text-align:left;"><strong>${resetToken}</strong></td>
                                      </tr>
                                  </table>
                                  <p style="text-align:left; color:#455056; font-size:15px;line-height:24px; margin:0;">This token will expire in one hour from the time of the request.</p>
                              </td>
                          </tr>
                          <tr>
                              <td style="height:80px; text-align:left;padding:15px 35px">
                          Best regards
                          
                                  <span style='display:block;'>Todo App Team</span>
                              </td>
                          </tr>
                      </table>
                  </td>
                  <tr>
                      <td style="height:20px;">&nbsp;</td>
                  </tr>
                  <tr>
                      <td style="height:80px;">&nbsp;</td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>
  <!--/100% body table-->
</body>`;
};

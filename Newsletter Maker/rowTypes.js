const rowTypes = {
    "Normal": "<tr style=\"border:2px solid lightgray;\"> \
    <td colspan=\"4\" style=\"padding:40px;\" class=\"article\"> \
      <p style=\"font-family:'Open Sans',Helvetica,sans-serif;line-height: 1.5; font-size:16px;font-weight:bold; text-align:center;color:#4f4f4f;\">TEXT</p> \
    </td> \
  </tr>",
    "Alert": "<tr style=\"border:2px solid lightgray; background-color:lightblue\"> \
    <td style=\"padding:40px;\" colspan=\"4\" class=\"content\"> \
      <h1 style=\"line-height: 1.5;font-size:50px;font-weight:bold;color:#4f4f4f;\">Heading</h1> \
      <div style=\"font-family:'Open Sans',Helvetica,sans-serif;line-height: 1.5;font-size:20px;text-align:center;color:#4f4f4f;\"> \
        <p> \
          TEXT \
        </p> \
      </div> \
    </td> \
    </tr>",
    "Photo":"<tr style=\"border:2px solid lightgray;\"> \
    <td colspan=\"4\" style=\"padding:40px;\" class=\"article\"> \
      <div style=\"width:700px; max-height: 1200px; overflow:hidden; margin-left:auto; margin-right:auto;\"> \
        <h1 style=\"text-align:center\"> \
        <a style=\"color:dodgerblue\" href=\"#\"><img src=\"https://evebej.github.io/IOCS_Newsletter_Repo/images/2023/2021-04-15.jpg\" alt=\"Mushrooms on Tree\" class=\"top-pic\" style=\"width:500px; max-height: 100%;\"></a> \
        </h1> \
      </div> \
      <p style=\"font-family:'Open Sans',Helvetica,sans-serif;line-height: 1.45;text-align:center;font-size:14px;color:#4f4f4f;\"> \
        Caption \
      </p> \
    </td> \
    </tr>",
    "Article": "<tr style=\"border:2px solid lightgray; background-color:#f0f0f0\"> \
    <td colspan=\"4\" style=\"padding:40px;\" class=\"article\"> \
        <div style=\"width:750px;background-color:#eee;color:#4f4f4f;padding:20px 20px; margin: 0 auto;\"> \
        <h2 style=\"line-height: 1.3;font-size:40px;font-weight:bold;\">Title</h2> \
        <div style=\"height:422px;overflow:hidden; margin:0px auto;\"> \
        <div style=\"max-height:500px\">\
            <!-- Header Photo (Lengthy) --> \
            <img src=\"https:\/\/evebej.github.io/IOCS_Newsletter_Repo/images/2023/c45639_a6525ff1a40c401095c192110da13325_mv2.png\" alt=\"Big Bang Illustration\" style=\"width:100%;margin:0px auto;\"> \
        </div> \
        </div>\
        <p style=\"padding:10px; line-height:1.2;\"> \
        <i> \
            Teaser \
          </i> \
        </p> \
        <p style=\"padding:10px;\">Link: <u>#</u></p> \
        <p><a href=\"#\"  style=\"font-family:Trebuchet MS;cursor:pointer; text-align:center; display:block; padding:10px 8px;text-decoration:none;text-align:center; background-color:#000;color:#fff;width:100%;border:none; margin: 0 auto;\"> \
        READ ARTICLE</a></p> \
    </div> \
    </td> \
    </tr>",
    "Banner":"<tr style=\"border:2px solid lightgray; background-color:#f0f0f0\"> \
    <td colspan=\"4\" style=\"padding:40px;\" class=\"article\"> \
      <p style=\"font-family:'Open Sans',Helvetica,sans-serif;line-height: 1.5;font-size:16px;font-weight:bold; text-align:center\"> \
        TEXT <a style=\color:dodgerblue\" href=\"#\">HERE</a>!</p> \
    </td> <!--Ad--> \
    </tr>"
}
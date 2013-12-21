<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <?php ewd_meta_tags(); ?> 
    <title>
        <?php ewd_title(); ?> 
    </title>
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.png" />
    <?php
    // stuff we wanna call before wp_head
    ewd_pre_wp_head();
    // call the wp_head stuff
    wp_head();
    // stuff we wana call after wp_head
    ewd_post_wp_head();
    ?> 
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

    <!-- Website developed by http://www.echowebdynamics.com -->
</head>
<body>
    <div id="wrapper">
        <div id="header">
            
        </div>
        
        <div id="main">
            
        </div>
        
        <div id="footer">
            
        </div>
    </div>
    <?php
    wp_footer();
    ?>
</body>
</html>

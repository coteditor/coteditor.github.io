<?php

$url = 'https://github.com/coteditor/CotEditor/releases/download/1.4/CotEditor_1.4.dmg';

header("HTTP/1.1 302 Moved Temporarily");
header("Location: ".$url);

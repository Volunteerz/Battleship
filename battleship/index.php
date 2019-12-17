<?php
    $n = 10;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Battleship Game</title>
        <link type="text/css" rel="stylesheet" href="style.css" />
        <script src="js/init.js"></script>
        <script src="js/simpleajax.js"></script>
        <script src="js/sign_in.js"></script>
    </head>
    <body>
        <div class = "top-banner">
            <button class = "sign_in"><a href = "sign_in.php">Sign_in</a></button>
            <button class = "tourist"><a href = "tourist.php">Tourist</a></button>
        </div>
        <div class = "field">
         <div id="top_banner">
            <label>Console</label>
            <textarea rows="1" cols="50" readonly="readonly" class = "textarea" >Welcome to the battleship game
            </textarea> 
        </div>
    	<div class = "field1" ondrop="drop(event)" ondragover="allowDrop(event)">
    		<table class = "field-table1" border="1">
    			<tbody>
                    <?php 
                        for($i = 0; $i < $n; $i++) {
                    ?>
    				<tr class = "field-row">
                        <?php 
                            for($j = 0; $j < $n; $j++) {
                        ?>
    					<td>
    						<div id = "field-cell-content" class = "field-cell-empty" data-y = <?=$j?> data-x = <?=$i?> data-ship = "F">
                                
    						</div>
    					</td>
                        <?php
                        }
                        ?>
                    </tr>
                    <?php
                    }
                    ?>
    			</tbody>
    		</table>
            <div id = "ship-box" ondrop="drop(event)" >
                <?php 
                    for($i = 0; $i < 10; $i++) {
                ?>
                <div id = "ship<?=$i?>" class = "ship" data-state="h" draggable="true" ondragstart="drag(event)" data-x = -1 data-y = -1></div>
                <?php
                }
                ?>
            </div>
        </div>
        <div class="field2">
            <table class = "field-table2" border="1">
                <tbody>
                    <?php 
                        for($i = 0; $i < $n; $i++) {
                    ?>
                    <tr class = "field-row">
                        <?php 
                            for($j = 0; $j < $n; $j++) {
                        ?>
                        <td>
                            <div id = "field-cell-content" class = "field-cell-empty" data-y = <?=$j?> data-x = <?=$i?>>
                                
                            </div>
                        </td>
                        <?php
                        }
                        ?>
                    </tr>
                    <?php
                    }
                    ?>
                </tbody>
            </table>
    	</div>
        </div>
        <div id = "ships-list">
        </div>
        <div class="bottom-banner">
            <button type = "button" onclick = "Battle_with_AI();">Battle_with_AI</button>
            <button type = "button" onclick = "Battle_with_Player();">Battle_with_Player</button>
            <button type = "button" onclick = "Quit_game();">Quit this game</button>
        </div>  
    </body>
</html>

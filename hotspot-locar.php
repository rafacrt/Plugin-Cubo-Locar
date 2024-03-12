<?php
/*
Plugin Name: Hotspot Locar
Description: Um plugin para adicionar hotspots com conectores a uma imagem.
Version: 1.0
Author: Rafael Medeiros
*/

// Adicione scripts e estilos apenas na página onde o shortcode do plugin é usado
function adicionar_scripts_estilos() {
    // Registra o estilo do plugin
    wp_register_style('hotspotlocar-estilo', plugins_url('style.css', __FILE__));
    
    // Adiciona o estilo apenas se o shortcode do plugin estiver presente no conteúdo da página
    if (has_shortcode(get_the_content(), 'hotspotlocar')) {
        wp_enqueue_style('hotspotlocar-estilo');
    }

    // Enfileira os demais scripts e estilos
    wp_enqueue_style('bootstrap', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css');
    wp_enqueue_style('bootstrap-jquery-ui', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-bootstrap/0.5pre/assets/css/bootstrap.min.css');
    wp_enqueue_script('jquery');
    wp_enqueue_script('hotspotlocar-script', plugins_url('script.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'adicionar_scripts_estilos');

// Defina o shortcode para exibir o conteúdo do plugin
function hotspotlocar_shortcode() {
    ob_start();
    ?>
    <div class="row" id="documentWhole">

        <!-- ********** SVG CONTAINER *********** -->
        <div id="svgContainer">
            <div class='spot'></div>
            <svg id="svg1" width="50px" height="150%" style="min-height: 100%;">
                <!--       <image href="https://image-cdn.essentiallysports.com/wp-content/uploads/20200330230933/MJORDAN-768x766.jpg" x="33.33333333333%" y="0" height="100%" width="43.66666666%" /> -->

                <path class="path" id="path1" d="M0 0" stroke="red" fill="none" stroke-width="1.5px" ; />
                <path class="path" id="path2" d="M0 0" stroke="red" fill="none" stroke-width="1.5px" ; />
                <path class="path" id="path3" d="M0 0" stroke="red" stroke-width="1.5px" style="fill:none;" />
                <path class="path" id="path4" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none; " />
                <path class="path" id="path5" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path6" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path7" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path8" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path9" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path10" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path11" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
                <path class="path" id="path12" d="M0 0" stroke-width="1.5px" style="stroke:red; fill:none;" />
            </svg>
        </div>
        <!-- ********* LEFT TABLE *********** -->
        <div class="col-4">
            <ul class="lista-ul" id="left_table">
                <li class="lista-h" id="list_item_1">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id="bullet_point1" data-target="#hs-a" data-path="#path1"
                                data-list="#list_item_1"></div>
                            <!--           <div class="bullet_point" id="bullet_point1" data-target="#hs-a" data-path="#path1" data-list="#list_item_1"></div> -->
                            <!-- <div class="card-header">Rechargeable Battery<span id='coord'></span></div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Equipe de engenharia com amplo conhecimento e experiência
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_2">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id="bullet_point2" data-target="#hs-b" data-path="#path2"
                                data-list="#list_item_2"></div>

                        </div>
                        <div class="card-body2">
                            <p>
                                Multimodalidade
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_3">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id="bullet_point3" data-target="#hs-c" data-path="#path3"
                                data-list="#list_item_3"></div>
                            <!-- <div class="card-header">Intuitive User Interface</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Diversidade de serviços espalhados pelo país
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_4">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id="bullet_point4" data-target="#hs-d" data-path="#path4"
                                data-list="#list_item_4"></div>
                            <!-- <div class="card-header">Seamless Upgrade to Root®</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Equipamentos e profissionais que acompanham sua obra
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_5">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id="bullet_point5" data-target="#hs-e" data-path="#path5"
                                data-list="#list_item_5"></div>
                            <!--           <div class="bullet_point" id="bullet_point1" data-target="#hs-a" data-path="#path1" data-list="#list_item_1"></div> -->
                            <!-- <div class="card-header">Rechargeable Battery<span id='coord'></span></div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Solução e eficácia para seus projetos
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_6">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id="bullet_point6" data-target="#hs-f" data-path="#path6"
                                data-list="#list_item_6"></div>
                            <!--           <div class="bullet_point" id="bullet_point1" data-target="#hs-a" data-path="#path1" data-list="#list_item_1"></div> -->
                            <!-- <div class="card-header">Rechargeable Battery<span id='coord'></span></div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Solidez financeira
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- *********** PICTURE ************ -->
        <div class="col-3">
            <div class="hotspots">
                <img src="https://projetos.rajo.com.br/locar/wp-content/uploads/2024/01/9cubo-locar.png" id="clickme" style="margin:0% 0 0 5%;" />
                <input type="checkbox" class="input-hot" id="input1" name="inputs">
                <input type="checkbox" class="input-hot" id="input2" name="inputs">
                <input type="checkbox" class="input-hot" id="input3" name="inputs">
                <input type="checkbox" class="input-hot" id="input4" name="inputs">
                <input type="checkbox" class="input-hot" id="input5" name="inputs">
                <input type="checkbox" class="input-hot" id="input6" name="inputs">
                <input type="checkbox" class="input-hot" id="input7" name="inputs">
                <input type="checkbox" class="input-hot" id="input8" name="inputs">
                <input type="checkbox" class="input-hot" id="input9" name="inputs">
                <input type="checkbox" class="input-hot" id="input10" name="inputs">
                <input type="checkbox" class="input-hot" id="input11" name="inputs">
                <input type="checkbox" class="input-hot" id="input12" name="inputs">

                <label for="input1">
                    <div id="hs-a" class="button" data-target="#bullet_point1" data-path="#path1" data-list="#list_item_1">
                    </div>
                </label>
                <label for="input2">
                    <div id="hs-b" class="button" data-target="#bullet_point2" data-targetAlt="#bullet_point2"
                        data-path="#path2" data-list="#list_item_2" data-listAlt="#list_item_2" data-pathAlt="#path2"></div>
                </label>
                <label for="input3">
                    <div id="hs-c" class="button" data-target="#bullet_point3" data-path="#path3" data-list="#list_item_3">
                    </div>
                </label>
                <label for="input4">
                    <div id="hs-d" class="button" data-target="#bullet_point4" data-path="#path4" data-list="#list_item_4">
                    </div>
                </label>
                <label for="input5">
                    <div id="hs-e" class="button" data-target="#bullet_point5" data-path="#path5" data-list="#list_item_5">
                    </div>
                </label>

                <label for="input6">
                    <div id="hs-f" class="button" data-target="#bullet_point6" data-path="#path6" data-list="#list_item_6">
                    </div>
                </label>

                <label for="input7">
                    <div id="hs-g" class="button" data-target="#bullet_point7" data-path="#path7" data-list="#list_item_7">
                    </div>
                </label>

                <label for="input8">
                    <div id="hs-h" class="button" data-target="#bullet_point8" data-path="#path8" data-list="#list_item_8">
                    </div>
                </label>

                <label for="input9">
                    <div id="hs-i" class="button" data-target="#bullet_point9" data-path="#path9" data-list="#list_item_9">
                    </div>
                </label>

                <label for="input10">
                    <div id="hs-j" class="button" data-target="#bullet_point10" data-path="#path10"
                        data-list="#list_item_10">
                    </div>
                </label>

                <label for="input11">
                    <div id="hs-k" class="button" data-target="#bullet_point11" data-path="#path11"
                        data-list="#list_item_11">
                    </div>
                </label>

                <label for="input12">
                    <div id="hs-l" class="button" data-target="#bullet_point12" data-path="#path12"
                        data-list="#list_item_12">
                    </div>
                </label>

                <!--           <div href="#" class="hotspot" id="hs-a"></div> -->
                <!--           <div href="#" class="hotspot" id="hs-b">B</div>
          <div href="#" class="hotspot" id="hs-c">C</div>
          <div href="#" class="hotspot" id="hs-d">D</div> -->
            </div>
        </div>
        <!-- *********** RIGHT TABLE ************  -->
        <div class="col-4">
            <ul id="rightList">
                <li class="lista-h" id="list_item_7">
                    <div class="card">
                        <div class='row'>
                            <div class="bullet_point" id="bullet_point7" data-target="#hs-g" data-path="#path7"
                                data-list="#list_item_7"></div>
                            <!-- <div class="card-header">Electronic Charting</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Equipamentos modernos e alta disponibilidade nos atendimentos para garantir produtividade
                                aos clientes.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_8">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id='bullet_point8' data-target="#hs-h" data-path="#path8"
                                data-list="#list_item_8"></div>
                            <!-- <div class="card-header">Plethysmographic Waveform</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Segmentos integrados em uma solução inteligente.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_9">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id='bullet_point9' data-target="#hs-i" data-path="#path9"
                                data-list="#list_item_9"></div>
                            <!-- <div class="card-header">Automatic Display Rotation</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Capilaridade.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_10">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id='bullet_point10' data-target="#hs-j" data-path="#path10"
                                data-list="#list_item_10"></div>
                            <!-- <div class="card-header">Automatic Display Rotation</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Excelência em solidez e gestão de todos os departamentos.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_11">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id='bullet_point11' data-target="#hs-k" data-path="#path11"
                                data-list="#list_item_11"></div>
                            <!-- <div class="card-header">Automatic Display Rotation</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Grande variedade de frotas para atender uma grande diversidade de projetos.
                            </p>
                        </div>
                    </div>
                </li>
                <li class="lista-h" id="list_item_12">
                    <div class="card">
                        <div class=row>
                            <div class="bullet_point" id='bullet_point12' data-target="#hs-l" data-path="#path12"
                                data-list="#list_item_12"></div>
                            <!-- <div class="card-header">Automatic Display Rotation</div> -->
                        </div>
                        <div class="card-body2">
                            <p>
                                Equipes treinadas e capacitadas em prol de um único objetivo: foco total no cliente com
                                segurança,
                                agilidade, simplicidade e prazer em atender.
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('hotspotlocar', 'hotspotlocar_shortcode');
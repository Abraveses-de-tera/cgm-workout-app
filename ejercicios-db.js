// =============================================================================
// CGM RENDIMIENTO - BASE DE DATOS MAESTRA OFICIAL DE EJERCICIOS Y VIDEOS (103 EJERCICIOS)
// Extraida del archivo oficial de Google Drive de Carlos Grana
// Enlaces directos de Google Drive y guias tecnicas de demostracion
// =============================================================================

(function(global) {
  'use strict';

  var BASE_DATOS_EJERCICIOS = [
    { id: "crunch_abdominal_declinado", nombre: "Crunch abdominal declinado", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "crunch_abdominal_en_banco_plano", nombre: "Crunch abdominal en banco plano", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "crunch_abdominal_en_maquina", nombre: "Crunch abdominal en máquina", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "crunch_abdominal_en_polea", nombre: "Crunch abdominal en polea.mp4", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "crunch_abdominal", nombre: "Crunch abdominal.mp4", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "elevaciones_de_pierna", nombre: "Elevaciones de pierna.mp4", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "elevaciones_de_rodillas", nombre: "Elevaciones de rodillas.mp4", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "plancha_abdominal", nombre: "Plancha abdominal.mp4", grupo: "Abdomen", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "curl_antebrazo_barra_z", nombre: "curl antebrazo barra z", grupo: "Antebrazo", estado: "disponible", archivo: "curl antebrazo barra z.mp4", driveId: "17M9XVZG0Pp0Ozi9Yco35d5xHuj821pQw", driveUrl: "https://drive.google.com/open?id=17M9XVZG0Pp0Ozi9Yco35d5xHuj821pQw&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "extension_antebrazo_barra_z", nombre: "Extensión antebrazo barra z", grupo: "Antebrazo", estado: "disponible", archivo: "Extensión antebrazo barra z.mp4", driveId: "1d5g5z-RDEX5f6O-_Bq5BPK3MOaF4ssCM", driveUrl: "https://drive.google.com/file/d/1d5g5z-RDEX5f6O-_Bq5BPK3MOaF4ssCM/view", youtubeId: "2-LAMcpzODU" },
    { id: "curl_arana", nombre: "curl araña", grupo: "Bíceps", estado: "disponible", archivo: "curl araña.mp4", driveId: "1icl6z4zRHYoccMPweQFGYgoq0YfRq-3N", driveUrl: "https://drive.google.com/open?id=1icl6z4zRHYoccMPweQFGYgoq0YfRq-3N&usp=drive_copy", youtubeId: "fIWP-FRFNU0" },
    { id: "curl_bayesian_unilateral", nombre: "curl bayesian unilateral", grupo: "Bíceps", estado: "disponible", archivo: "curl bayesian unilateral.mp4", driveId: "10bwuAY_NTbeBk_qLyhJj3AayjRoVhGqK", driveUrl: "https://drive.google.com/open?id=10bwuAY_NTbeBk_qLyhJj3AayjRoVhGqK&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_biceps_alterno", nombre: "curl biceps alterno", grupo: "Bíceps", estado: "disponible", archivo: "curl biceps alterno.mp4", driveId: "1WTGpMBI7Z6WIcvrotyDIvC4fVB-D4VOB", driveUrl: "https://drive.google.com/open?id=1WTGpMBI7Z6WIcvrotyDIvC4fVB-D4VOB&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_biceps_barra_z", nombre: "curl biceps barra z", grupo: "Bíceps", estado: "disponible", archivo: "curl biceps barra z.mp4", driveId: "1RKWnNYtVnqxSVj4R4kme2-ahCH4-MZTT", driveUrl: "https://drive.google.com/open?id=1RKWnNYtVnqxSVj4R4kme2-ahCH4-MZTT&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_biceps_mancuerna_banco_inclinado", nombre: "Curl biceps mancuerna banco inclinado", grupo: "Bíceps", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "curl_biceps_mancuernas", nombre: "curl biceps mancuernas", grupo: "Bíceps", estado: "disponible", archivo: "curl biceps mancuernas.mp4", driveId: "1MCg4138MUmVwter8Y_eZG2agjj5ahBtV", driveUrl: "https://drive.google.com/open?id=1MCg4138MUmVwter8Y_eZG2agjj5ahBtV&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_biceps_polea", nombre: "curl biceps polea", grupo: "Bíceps", estado: "disponible", archivo: "curl biceps polea.mp4", driveId: "1UR8m3bx52Vii23-_Z311GtNapvvXNkCl", driveUrl: "https://drive.google.com/open?id=1UR8m3bx52Vii23-_Z311GtNapvvXNkCl&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_biceps_polea_alta", nombre: "curl biceps polea alta", grupo: "Bíceps", estado: "disponible", archivo: "curl biceps polea alta.mp4", driveId: "1BvO-2tMbIZhEvgua8mjCcB4SJHGkwPHi", driveUrl: "https://drive.google.com/open?id=1BvO-2tMbIZhEvgua8mjCcB4SJHGkwPHi&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_concentrado", nombre: "curl concentrado", grupo: "Bíceps", estado: "disponible", archivo: "curl concentrado.mp4", driveId: "1PC7TC7pazUl0Po8N-k_TH1qigIY8oUG5", driveUrl: "https://drive.google.com/open?id=1PC7TC7pazUl0Po8N-k_TH1qigIY8oUG5&usp=drive_copy", youtubeId: "ykJmrZ5v0Oo" },
    { id: "curl_martillo_mancuernas", nombre: "curl martillo mancuernas", grupo: "Bíceps", estado: "disponible", archivo: "curl martillo mancuernas.mp4", driveId: "1-c1XkxDd6r5e7YUA1A9KIvJx8l6ta7XL", driveUrl: "https://drive.google.com/open?id=1-c1XkxDd6r5e7YUA1A9KIvJx8l6ta7XL&usp=drive_copy", youtubeId: "zC3nLlEvin4" },
    { id: "dominadas", nombre: "dominadas", grupo: "Espalda", estado: "disponible", archivo: "dominadas.mp4", driveId: "1NiaC40gwttA9Z0KLBtw1NU-yVLgKesCM", driveUrl: "https://drive.google.com/open?id=1NiaC40gwttA9Z0KLBtw1NU-yVLgKesCM&usp=drive_copy", youtubeId: "eGo4IYlbE5g" },
    { id: "dominadas_asistidas", nombre: "dominadas asistidas", grupo: "Espalda", estado: "disponible", archivo: "dominadas asistidas.mp4", driveId: "1UbjdGUwyY2exxs_oDkYYFWVU25v0BRZg", driveUrl: "https://drive.google.com/open?id=1UbjdGUwyY2exxs_oDkYYFWVU25v0BRZg&usp=drive_copy", youtubeId: "eGo4IYlbE5g" },
    { id: "encogimientos_con_barra", nombre: "encogimientos con barra", grupo: "Espalda", estado: "disponible", archivo: "encogimientos con barra.mp4", driveId: "1qW9bv_WqBNtI5ebGsMoSB0es-gtMiKTv", driveUrl: "https://drive.google.com/open?id=1qW9bv_WqBNtI5ebGsMoSB0es-gtMiKTv&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "encogimientos_con_mancuerna", nombre: "encogimientos con mancuerna", grupo: "Trapecio", estado: "disponible", archivo: "encogimientos con mancuernas.mp4", driveId: "1e5-meuujzgvJLUzqvS15_DMf6P1OCNlK", driveUrl: "https://drive.google.com/open?id=1e5-meuujzgvJLUzqvS15_DMf6P1OCNlK&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "jalon_agarre_abierto", nombre: "jalón agarre abierto", grupo: "Espalda", estado: "disponible", archivo: "jalón agarre abierto.mp4", driveId: "1n-rp7Q6368GP41-AEAmgm-A5EpqXXsE0", driveUrl: "https://drive.google.com/open?id=1n-rp7Q6368GP41-AEAmgm-A5EpqXXsE0&usp=drive_copy", youtubeId: "CAwf7n6Luuc" },
    { id: "jalon_agarre_cerrado", nombre: "jalón agarre cerrado", grupo: "Espalda", estado: "disponible", archivo: "jalón agarre cerrado.mp4", driveId: "1YFIVTbfOAMUEaxcggYFS3Rq0ba3bnmMy", driveUrl: "https://drive.google.com/open?id=1YFIVTbfOAMUEaxcggYFS3Rq0ba3bnmMy&usp=drive_copy", youtubeId: "CAwf7n6Luuc" },
    { id: "jalon_agarre_neutro", nombre: "jalón agarre neutro", grupo: "Espalda", estado: "disponible", archivo: "jalón agarre neutro.mp4", driveId: "1V5rQqSYq2YX5p9qYEUPRPnavOeWfIV-b", driveUrl: "https://drive.google.com/open?id=1V5rQqSYq2YX5p9qYEUPRPnavOeWfIV-b&usp=drive_copy", youtubeId: "CAwf7n6Luuc" },
    { id: "jalon_al_pecho_agarre_neutro", nombre: "Jalón al pecho agarre neutro", grupo: "Espalda", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "CAwf7n6Luuc" },
    { id: "jalon_al_pecho_agarre_v", nombre: "Jalon al pecho agarre v", grupo: "Espalda", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "CAwf7n6Luuc" },
    { id: "jalon_unilateral", nombre: "jalón unilateral", grupo: "Espalda", estado: "disponible", archivo: "jalón unilateral.mp4", driveId: "12c5vUNz8uJqtEZrQp5eA75uKFxzlywO7", driveUrl: "https://drive.google.com/open?id=12c5vUNz8uJqtEZrQp5eA75uKFxzlywO7&usp=drive_copy", youtubeId: "CAwf7n6Luuc" },
    { id: "jalon_unilateral_en_polea", nombre: "jalón unilateral en polea", grupo: "Espalda", estado: "disponible", archivo: "jalón unilateral en polea.mp4", driveId: "1q8GfBzXRkEhKomab9qlXagOGS9vVq4RF", driveUrl: "https://drive.google.com/open?id=1q8GfBzXRkEhKomab9qlXagOGS9vVq4RF&usp=drive_copy", youtubeId: "CAwf7n6Luuc" },
    { id: "pullover", nombre: "pullover", grupo: "Espalda", estado: "disponible", archivo: "pullover.mp4", driveId: "1Q13asg7FNzVMbGhh4HRWKIpRo8dQEx6j", driveUrl: "https://drive.google.com/open?id=1Q13asg7FNzVMbGhh4HRWKIpRo8dQEx6j&usp=drive_copy", youtubeId: "Jb_T2B5zQ5c" },
    { id: "remo_con_barra", nombre: "remo con barra", grupo: "Espalda", estado: "disponible", archivo: "remo con barra.mp4", driveId: "1kdK8Tac9qWiT8B8-Sbh8z3HKKaFyg_FS", driveUrl: "https://drive.google.com/open?id=1kdK8Tac9qWiT8B8-Sbh8z3HKKaFyg_FS&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "remo_con_barra_polea", nombre: "remo con barra polea", grupo: "Espalda", estado: "disponible", archivo: "remo con barra polea.mp4", driveId: "1SaDVnrpeebHlkFLkQA6Aav11yh-uLcMA", driveUrl: "https://drive.google.com/open?id=1SaDVnrpeebHlkFLkQA6Aav11yh-uLcMA&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "remo_con_mancuerna", nombre: "remo con mancuerna", grupo: "Espalda", estado: "disponible", archivo: "remo con mancuerna.mp4", driveId: "1qO5UKMQPL1dEqliBU5X6NqhDt2GXWVtM", driveUrl: "https://drive.google.com/open?id=1qO5UKMQPL1dEqliBU5X6NqhDt2GXWVtM&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "remo_gironda", nombre: "remo gironda", grupo: "Espalda", estado: "disponible", archivo: "remo gironda.mp4", driveId: "1i6WmA_rHubTCAoltn_TvmTZHR7jSrvK5", driveUrl: "https://drive.google.com/open?id=1i6WmA_rHubTCAoltn_TvmTZHR7jSrvK5&usp=drive_copy", youtubeId: "CAwf7n6Luuc" },
    { id: "elevaciones_frontales", nombre: "elevaciones frontales", grupo: "Hombro", estado: "disponible", archivo: "elevaciones frontales.mp4", driveId: "1J3JKJmMFm73kcD07_9y_yhHexKfjMJPQ", driveUrl: "https://drive.google.com/open?id=1J3JKJmMFm73kcD07_9y_yhHexKfjMJPQ&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_frontales_apoyado_en_banco", nombre: "elevaciones frontales apoyado en banco", grupo: "Hombro", estado: "disponible", archivo: "elevaciones frontales apoyado en banco.mp4", driveId: "1YwmD9_0NGAZtY59v1ulT-m_jb4nEzes0", driveUrl: "https://drive.google.com/open?id=1YwmD9_0NGAZtY59v1ulT-m_jb4nEzes0&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_frontales_polea", nombre: "elevaciones frontales polea", grupo: "Hombro", estado: "disponible", archivo: "elevaciones frontales polea.mp4", driveId: "1eWgytIeRYQKQehCpdxs7V_ttHqwmjNhh", driveUrl: "https://drive.google.com/open?id=1eWgytIeRYQKQehCpdxs7V_ttHqwmjNhh&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_laterales", nombre: "elevaciones laterales", grupo: "Hombro", estado: "disponible", archivo: "elevaciones laterales.mp4", driveId: "1mSQ02wCZJqKmsfOlWcP2TwwEkwTZ5ADZ", driveUrl: "https://drive.google.com/open?id=1mSQ02wCZJqKmsfOlWcP2TwwEkwTZ5ADZ&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_laterales_apoyado_en_banco", nombre: "elevaciones laterales apoyado en banco", grupo: "Hombro", estado: "disponible", archivo: "elevaciones laterales apoyado en banco.mp4", driveId: "13JgOc98czqPD15EJ0LqB5h41TDB1_8_k", driveUrl: "https://drive.google.com/open?id=13JgOc98czqPD15EJ0LqB5h41TDB1_8_k&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_laterales_en_maquina", nombre: "Elevaciones laterales en máquina", grupo: "Hombro", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_laterales_en_polea", nombre: "Elevaciones laterales en polea", grupo: "Hombro", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_laterales_polea", nombre: "elevaciones laterales polea", grupo: "Hombro", estado: "disponible", archivo: "elevaciones laterales polea.mp4", driveId: "1MSj8mji-FT8hSAJzGrh5OXvKRlU0S-zu", driveUrl: "https://drive.google.com/open?id=1MSj8mji-FT8hSAJzGrh5OXvKRlU0S-zu&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "elevaciones_laterales_sentado", nombre: "elevaciones laterales sentado", grupo: "Hombro", estado: "disponible", archivo: "elevaciones laterales sentado.mp4", driveId: "1sf1qnv3Z1CHiFBU6VGLL45V1x8duHvu1", driveUrl: "https://drive.google.com/open?id=1sf1qnv3Z1CHiFBU6VGLL45V1x8duHvu1&usp=drive_copy", youtubeId: "3VcKaXpzqRo" },
    { id: "facepull", nombre: "facepull", grupo: "Hombro", estado: "disponible", archivo: "facepull.mp4", driveId: "1r_u_eFQvYn2pFvAFcw-Jlrou5irb_vPo", driveUrl: "https://drive.google.com/open?id=1r_u_eFQvYn2pFvAFcw-Jlrou5irb_vPo&usp=drive_copy", youtubeId: "rep-qVOkqgk" },
    { id: "hombro_posterior_en_polea", nombre: "hombro posterior en polea", grupo: "Hombro", estado: "disponible", archivo: "hombro posterior en polea.mp4", driveId: "1RCYisOhiSO1CuAhjGjZqCLn6aVEVvz-1", driveUrl: "https://drive.google.com/open?id=1RCYisOhiSO1CuAhjGjZqCLn6aVEVvz-1&usp=drive_copy", youtubeId: "rep-qVOkqgk" },
    { id: "hombro_posterior_mancuerna", nombre: "hombro posterior mancuerna", grupo: "Hombro", estado: "disponible", archivo: "hombro posterior mancuerna.mp4", driveId: "1qNXBig2UpedJ9UL49XEmB6xpa9vZylT3", driveUrl: "https://drive.google.com/open?id=1qNXBig2UpedJ9UL49XEmB6xpa9vZylT3&usp=drive_copy", youtubeId: "rep-qVOkqgk" },
    { id: "pajaros_en_maquina", nombre: "pájaros en máquina", grupo: "Hombro", estado: "disponible", archivo: "pájaros en máquina.mp4", driveId: "1ctrI2aPxnmT8Iv3Zt37IDv9JlVBViUck", driveUrl: "https://drive.google.com/open?id=1ctrI2aPxnmT8Iv3Zt37IDv9JlVBViUck&usp=drive_copy", youtubeId: "rep-qVOkqgk" },
    { id: "press_militar_con_mancuerna", nombre: "press militar con mancuerna", grupo: "Hombro", estado: "disponible", archivo: "press militar con mancuerna.mp4", driveId: "1ju4cvO_aA2ow8G_XmZf1rz9SVLd0Ysy9", driveUrl: "https://drive.google.com/open?id=1ju4cvO_aA2ow8G_XmZf1rz9SVLd0Ysy9&usp=drive_copy", youtubeId: "2yjwXTZQDDI" },
    { id: "aparturas_en_maquina", nombre: "aparturas en máquina", grupo: "Pecho", estado: "disponible", archivo: "aparturas en máquina.mp4", driveId: "15jDPtfPBVpPXffkJkYJgCKiiDjyB6f_E", driveUrl: "https://drive.google.com/open?id=15jDPtfPBVpPXffkJkYJgCKiiDjyB6f_E&usp=drive_copy", youtubeId: "eozdVDA78K0" },
    { id: "aperturas_con_mancuerna", nombre: "aperturas con mancuerna", grupo: "Pecho", estado: "disponible", archivo: "aperturas con mancuerna.mp4", driveId: "1S5uFx6S2agvW1OmgrVcEwZ7ekgsNjEIr", driveUrl: "https://drive.google.com/open?id=1S5uFx6S2agvW1OmgrVcEwZ7ekgsNjEIr&usp=drive_copy", youtubeId: "eozdVDA78K0" },
    { id: "aperturas_con_mancuerna_banco_plano", nombre: "aperturas con mancuerna banco plano", grupo: "Pecho", estado: "disponible", archivo: "aperturas con mancuerna banco plano.mp4", driveId: "15wsrA7kdi8kSkfIIzLUYHAi3NqU-NAiu", driveUrl: "https://drive.google.com/open?id=15wsrA7kdi8kSkfIIzLUYHAi3NqU-NAiu&usp=drive_copy", youtubeId: "eozdVDA78K0" },
    { id: "contractora", nombre: "Contractora", grupo: "Pecho", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eozdVDA78K0" },
    { id: "cruces_en_polea_desde_abajo", nombre: "cruces en polea desde abajo", grupo: "Pecho", estado: "disponible", archivo: "cruces en polea desde abajo.mp4", driveId: "1A3wybVQer98mXdyqyuWcfq2JDZRW9PFg", driveUrl: "https://drive.google.com/open?id=1A3wybVQer98mXdyqyuWcfq2JDZRW9PFg&usp=drive_copy", youtubeId: "eozdVDA78K0" },
    { id: "cruces_en_polea_desde_arriba", nombre: "cruces en polea desde arriba", grupo: "Pecho", estado: "disponible", archivo: "cruces en polea desde arriba.mp4", driveId: "1WjfF3fuGn2hNHjaXsrtKpTudsc4QVGa4", driveUrl: "https://drive.google.com/open?id=1WjfF3fuGn2hNHjaXsrtKpTudsc4QVGa4&usp=drive_copy", youtubeId: "eozdVDA78K0" },
    { id: "flexiones", nombre: "flexiones", grupo: "Pecho", estado: "disponible", archivo: "flexiones.mp4", driveId: "1JMajhLriYA_BV5ImIMS2cPtGhyGa9QEj", driveUrl: "https://drive.google.com/open?id=1JMajhLriYA_BV5ImIMS2cPtGhyGa9QEj&usp=drive_copy", youtubeId: "2z8JmcrW-As" },
    { id: "fondos", nombre: "fondos", grupo: "Tríceps", estado: "disponible", archivo: "fondos .mp4", driveId: "10aC9izgYa1gf2QlWR79gw2l8SEU3tzMV", driveUrl: "https://drive.google.com/open?id=10aC9izgYa1gf2QlWR79gw2l8SEU3tzMV&usp=drive_copy", youtubeId: "2z8JmcrW-As" },
    { id: "press_banca", nombre: "press banca", grupo: "Pecho", estado: "disponible", archivo: "press banca.mp4", driveId: "1YLmiakDKvpd3DF6C_WJU3xSNln2uLkzn", driveUrl: "https://drive.google.com/open?id=1YLmiakDKvpd3DF6C_WJU3xSNln2uLkzn&usp=drive_copy", youtubeId: "8iPEnn-ltC8" },
    { id: "press_con_mancuerna", nombre: "press con mancuerna", grupo: "Pecho", estado: "disponible", archivo: "press con mancuerna.mp4", driveId: "1paWOHOqVy4t-cFJhVyg-DV1dCrpDFFBO", driveUrl: "https://drive.google.com/open?id=1paWOHOqVy4t-cFJhVyg-DV1dCrpDFFBO&usp=drive_copy", youtubeId: "8iPEnn-ltC8" },
    { id: "press_declinado", nombre: "press declinado", grupo: "Pecho", estado: "disponible", archivo: "press declinado.mp4", driveId: "1EgFi42cONVEmHy89ARcIaJMW12ZpL5do", driveUrl: "https://drive.google.com/open?id=1EgFi42cONVEmHy89ARcIaJMW12ZpL5do&usp=drive_copy", youtubeId: "LfyQBUKR8SE" },
    { id: "press_inclinado_con_mancuerna", nombre: "Press inclinado con mancuerna", grupo: "Pecho", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "8iPEnn-ltC8" },
    { id: "press_inclinado_en_maquina", nombre: "press inclinado en máquina", grupo: "Pecho", estado: "disponible", archivo: "press inclinado en máquina.mp4", driveId: "1DzIDSkiflqpHjdrfIT03jsfAonN_dVE_", driveUrl: "https://drive.google.com/open?id=1DzIDSkiflqpHjdrfIT03jsfAonN_dVE_&usp=drive_copy", youtubeId: "8iPEnn-ltC8" },
    { id: "press_plano_en_maquina", nombre: "press plano en máquina", grupo: "Pecho", estado: "disponible", archivo: "press plano en máquina.mp4", driveId: "1aOw8-hVoMUnMAnSYxLdvIaY-DcHwaf3y", driveUrl: "https://drive.google.com/open?id=1aOw8-hVoMUnMAnSYxLdvIaY-DcHwaf3y&usp=drive_copy", youtubeId: "8iPEnn-ltC8" },
    { id: "press_sentado_en_maquina", nombre: "press sentado en máquina", grupo: "Pecho", estado: "disponible", archivo: "press sentado en máquina.mp4", driveId: "1LkgTvLwDxmx7st5szHeX8ZqJKe5kD2hj", driveUrl: "https://drive.google.com/open?id=1LkgTvLwDxmx7st5szHeX8ZqJKe5kD2hj&usp=drive_copy", youtubeId: "8iPEnn-ltC8" },
    { id: "aduccion_en_maquina", nombre: "Aducción en máquina", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "ELOCsoDSmrg" },
    { id: "aductor_en_maquina", nombre: "aductor en máquina", grupo: "Pierna", estado: "disponible", archivo: "aductor en máquina.mp4", driveId: "1pbJ_3pVAIqMCLb-oHnXqUODZi-n9mjaA", driveUrl: "https://drive.google.com/open?id=1pbJ_3pVAIqMCLb-oHnXqUODZi-n9mjaA&usp=drive_copy", youtubeId: "ELOCsoDSmrg" },
    { id: "extension_de_cuadriceps", nombre: "Extensión de cuadriceps", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "YyvSfVjQeL0" },
    { id: "femoral_de_pie", nombre: "femoral de pie", grupo: "Pierna", estado: "disponible", archivo: "femoral de pie.mp4", driveId: "1uHids5bLdy8n03mMOiCaelOFPRJkrqmE", driveUrl: "https://drive.google.com/open?id=1uHids5bLdy8n03mMOiCaelOFPRJkrqmE&usp=drive_copy", youtubeId: "1Tq3QdYUuHs" },
    { id: "femoral_de_pie_en_maquina", nombre: "Femoral de pie en máquina", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "1Tq3QdYUuHs" },
    { id: "femoral_sentado", nombre: "femoral sentado", grupo: "Pierna", estado: "disponible", archivo: "femoral sentado.mp4", driveId: "1haufRY77w3yw_bllnoV2LiES9QKblr07", driveUrl: "https://drive.google.com/open?id=1haufRY77w3yw_bllnoV2LiES9QKblr07&usp=drive_copy", youtubeId: "ELOCsoDSmrg" },
    { id: "femoral_tumbado", nombre: "femoral tumbado", grupo: "Pierna", estado: "disponible", archivo: "femoral tumbado.mp4", driveId: "1qd8DxpUbeVpr1Pr8IjmdxFSImsItZln0", driveUrl: "https://drive.google.com/open?id=1qd8DxpUbeVpr1Pr8IjmdxFSImsItZln0&usp=drive_copy", youtubeId: "1Tq3QdYUuHs" },
    { id: "femoral_tumbado_en_maquina", nombre: "Femoral tumbado en máquina", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "1Tq3QdYUuHs" },
    { id: "gemelo_de_pie", nombre: "Gemelo de pie", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "IZxyjW7MPJQ" },
    { id: "gemelo_sentado", nombre: "Gemelo sentado", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "IZxyjW7MPJQ" },
    { id: "gemelos_en_maquina", nombre: "gemelos en máquina", grupo: "Pierna", estado: "disponible", archivo: "gemelos en máquina.mp4", driveId: "1NfOhRDtvk0oj9dePHrbaqIEa-TW02vQc", driveUrl: "https://drive.google.com/open?id=1NfOhRDtvk0oj9dePHrbaqIEa-TW02vQc&usp=drive_copy", youtubeId: "IZxyjW7MPJQ" },
    { id: "gemelos_en_prensa", nombre: "Gemelos en prensa", grupo: "Pierna", estado: "disponible", archivo: "Gemelos en prensa.mp4", driveId: "17iXkUOxSHOy0Om2RZJdV_fDKehWqv5Q5", driveUrl: "https://drive.google.com/open?id=17iXkUOxSHOy0Om2RZJdV_fDKehWqv5Q5&usp=drive_copy", youtubeId: "IZxyjW7MPJQ" },
    { id: "hip_thrust", nombre: "Hip thrust", grupo: "Pierna", estado: "disponible", archivo: "Hip thrust.mp4", driveId: "13Fkwl6MsUk66qJMxKUYU0pIQ5GmqD8kC", driveUrl: "https://drive.google.com/open?id=13Fkwl6MsUk66qJMxKUYU0pIQ5GmqD8kC&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "patada_de_gluteo", nombre: "patada de glúteo", grupo: "Pierna", estado: "disponible", archivo: "patada de glúteo.mp4", driveId: "1Toc9PsFcVKFTrBElJZJuKTsE2iDs47vC", driveUrl: "https://drive.google.com/open?id=1Toc9PsFcVKFTrBElJZJuKTsE2iDs47vC&usp=drive_copy", youtubeId: "1Tq3QdYUuHs" },
    { id: "patada_de_gluteo_2", nombre: "Patada de glúteo", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "eGo4IYlbE5g" },
    { id: "peso_muerto_con_barra", nombre: "Peso muerto con barra", grupo: "Espalda", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "G8l_8chR5BE" },
    { id: "peso_muerto_convencional", nombre: "peso muerto convencional", grupo: "Pierna espalda", estado: "disponible", archivo: "peso muerto convencional.mp4", driveId: "1FYEXQZF3a5lUWZ8-eGOxABRKwX3jjqZO", driveUrl: "https://drive.google.com/open?id=1FYEXQZF3a5lUWZ8-eGOxABRKwX3jjqZO&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "peso_muerto_rumano_con_barra", nombre: "peso muerto rumano con barra", grupo: "Pierna", estado: "disponible", archivo: "peso muerto rumano con barra.mp4", driveId: "1G7rPGGxmdjMvNoltJkdTBRZnyub_DrS4", driveUrl: "https://drive.google.com/open?id=1G7rPGGxmdjMvNoltJkdTBRZnyub_DrS4&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "prensa", nombre: "Prensa", grupo: "Pierna", estado: "disponible", archivo: "Prensa.mp4", driveId: "1OlrJPfqwNFk0wLimLIPCnJHIlThxUNcb", driveUrl: "https://drive.google.com/open?id=1OlrJPfqwNFk0wLimLIPCnJHIlThxUNcb&usp=drive_copy", youtubeId: "IZxyjW7MPJQ" },
    { id: "prensa_horizontal", nombre: "Prensa horizontal", grupo: "Pierna", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "IZxyjW7MPJQ" },
    { id: "sentadilla_bulgara_en_maquina_smith", nombre: "sentadilla búlgara en máquina smith", grupo: "Pierna", estado: "disponible", archivo: "sentadilla búlgara en máquina smith.mp4", driveId: "1fX1R5No13TC9_lfPYaAc8Z0TFLXhRtDt", driveUrl: "https://drive.google.com/open?id=1fX1R5No13TC9_lfPYaAc8Z0TFLXhRtDt&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "sentadilla_multipower", nombre: "sentadilla multipower", grupo: "Pierna", estado: "disponible", archivo: "sentadilla en máquina smith.mp4", driveId: "1Wifjl5hfER675M6nVa9FYVSMGs-aZaOx", driveUrl: "https://drive.google.com/open?id=1Wifjl5hfER675M6nVa9FYVSMGs-aZaOx&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "sentadilla_hack", nombre: "sentadilla hack", grupo: "Pierna", estado: "disponible", archivo: "sentadilla hack.mp4", driveId: "1KxyKn7Gy08wuBKZ1Wk5_W-EZ1qaF7uFz", driveUrl: "https://drive.google.com/open?id=1KxyKn7Gy08wuBKZ1Wk5_W-EZ1qaF7uFz&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "sentadilla_profunda_pies_juntos", nombre: "sentadilla profunda pies juntos", grupo: "Pierna", estado: "disponible", archivo: "sentadilla profunda pies juntos.mp4", driveId: "1NV9fCNvNkUbzcUSxiu_YBabEYnDrfq9R", driveUrl: "https://drive.google.com/open?id=1NV9fCNvNkUbzcUSxiu_YBabEYnDrfq9R&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "sentadilla_sumo", nombre: "sentadilla sumo", grupo: "Pierna", estado: "disponible", archivo: "sentadilla sumo.mp4", driveId: "115CmEpcVitWf2OaZsUjOUF4TStqz_lIc", driveUrl: "https://drive.google.com/open?id=115CmEpcVitWf2OaZsUjOUF4TStqz_lIc&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "sldl", nombre: "SLDL", grupo: "Pierna", estado: "disponible", archivo: "SLDL.mp4", driveId: "1yCSGtwg-iwPJr_T6i9YPCN2EZMFZwtIr", driveUrl: "https://drive.google.com/open?id=1yCSGtwg-iwPJr_T6i9YPCN2EZMFZwtIr&usp=drive_copy", youtubeId: "G8l_8chR5BE" },
    { id: "zancada_en_smith", nombre: "zancada en smith", grupo: "Pierna", estado: "disponible", archivo: "zancada en smith.mp4", driveId: "12w8EAR9mWsR33M7OT0Ym9jipqeHH5LTC", driveUrl: "https://drive.google.com/open?id=12w8EAR9mWsR33M7OT0Ym9jipqeHH5LTC&usp=drive_copy", youtubeId: "0tn5K9NlCfo" },
    { id: "patada_de_triceps", nombre: "patada de triceps", grupo: "Tríceps", estado: "disponible", archivo: "patada de triceps.mp4", driveId: "16sVFC8bmoCjuRylsSLNMZy4l_1PfPmMB", driveUrl: "https://drive.google.com/open?id=16sVFC8bmoCjuRylsSLNMZy4l_1PfPmMB&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_frances", nombre: "press francés", grupo: "Tríceps", estado: "disponible", archivo: "press francés.mp4", driveId: "1ETMwSgpRIzeIjrTxenaXuv_uRy9u0w8u", driveUrl: "https://drive.google.com/open?id=1ETMwSgpRIzeIjrTxenaXuv_uRy9u0w8u&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_frances_con_mancuerna", nombre: "press francés con mancuerna", grupo: "Tríceps", estado: "disponible", archivo: "press francés con mancuerna.mp4", driveId: "19oWzRq0w3K9VZ6feBl-GHLX6ANpSy0L6", driveUrl: "https://drive.google.com/open?id=19oWzRq0w3K9VZ6feBl-GHLX6ANpSy0L6&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_frances_sobre_cabeza", nombre: "press frances sobre cabeza", grupo: "Tríceps", estado: "disponible", archivo: "press frances sobre cabeza.mp4", driveId: "1rcZFecupUX6q6aWGQhz72PwOCijteXft", driveUrl: "https://drive.google.com/open?id=1rcZFecupUX6q6aWGQhz72PwOCijteXft&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_trasnuca", nombre: "Press trasnuca", grupo: "Tríceps", estado: "disponible", archivo: "Press trasnuca.mp4", driveId: "1QOPTnpEqwqT-pXl_95ICNEcXZwRMsPyw", driveUrl: "https://drive.google.com/open?id=1QOPTnpEqwqT-pXl_95ICNEcXZwRMsPyw&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_trasnuca_con_mancuerna", nombre: "press trasnuca con mancuerna", grupo: "Tríceps", estado: "disponible", archivo: "press trasnuca con mancuerna.mp4", driveId: "1vBKNBBSmus_C030GQQiUiJIOYaVFr67N", driveUrl: "https://drive.google.com/open?id=1vBKNBBSmus_C030GQQiUiJIOYaVFr67N&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_trasnuca_con_mancuerna_a_una_mano", nombre: "press trasnuca con mancuerna a una mano", grupo: "Tríceps", estado: "disponible", archivo: "press trasnuca con mancuerna a una mano.mp4", driveId: "1quShZgdnQ-9qsuNFFwscTOqPVWr-BHLf", driveUrl: "https://drive.google.com/open?id=1quShZgdnQ-9qsuNFFwscTOqPVWr-BHLf&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
    { id: "press_triceps_fuerza", nombre: "Press triceps Fuerza", grupo: "Tríceps", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "2-LAMcpzODU" },
    { id: "triceps_en_polea_con_barra", nombre: "Triceps en polea con barra", grupo: "Tríceps", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "2-LAMcpzODU" },
    { id: "triceps_en_polea_con_cuerda", nombre: "Triceps en polea con cuerda", grupo: "Tríceps", estado: "rehacer", archivo: "", driveId: "", driveUrl: "", youtubeId: "2-LAMcpzODU" },
    { id: "triceps_polea_unilateral", nombre: "Triceps polea unilateral", grupo: "Tríceps", estado: "disponible", archivo: "triceps uni lateral.mp4", driveId: "19ycspdxyqtcTGkSwmGKD538TK2iJJE1B", driveUrl: "https://drive.google.com/open?id=19ycspdxyqtcTGkSwmGKD538TK2iJJE1B&usp=drive_copy", youtubeId: "2-LAMcpzODU" },
  ];

  // Mapa directo de los 26 ejercicios de la rutina oficial hacia la base de datos
  var MAPA_RUTINA_OFICIAL = {
    'd1_e1': 'pullover',
    'd1_e2': 'dominadas',
    'd1_e3': 'remo_con_barra',
    'd1_e4': 'jalon_agarre_cerrado',
    'd1_e5': 'remo_con_barra',
    'd1_e6': 'pajaros_en_maquina',
    'd1_e7': 'facepull',
    'd2_e1': 'press_inclinado_en_maquina',
    'd2_e2': 'aperturas_con_mancuerna',
    'd2_e3': 'press_declinado',
    'd2_e4': 'cruces_en_polea_desde_abajo',
    'd2_e5': 'elevaciones_laterales',
    'd2_e6': 'press_militar_con_mancuerna',
    'd2_e7': 'elevaciones_frontales',
    'd3_e1': 'femoral_tumbado',
    'd3_e2': 'extension_de_cuadriceps',
    'd3_e3': 'sentadilla_hack',
    'd3_e4': 'prensa',
    'd3_e5': 'aductor_en_maquina',
    'd3_e6': 'femoral_sentado',
    'd4_e1': 'curl_biceps_mancuernas',
    'd4_e2': 'triceps_en_polea_con_cuerda',
    'd4_e3': 'curl_arana',
    'd4_e4': 'press_trasnuca_con_mancuerna_a_una_mano',
    'd4_e5': 'curl_martillo_mancuernas',
    'd4_e6': 'fondos'
  };

  function normalizar(texto) {
    if (!texto) return "";
    return texto.toLowerCase()
      .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
      .replace(/\\.mp4/gi, '')
      .replace(/[^a-z0-9]/g, ' ')
      .trim();
  }

  var SINONIMOS = {
    'pull over en polea': 'pullover',
    'pullover en polea': 'pullover',
    'remo dorian': 'remo con barra',
    'posterior en maquina': 'pajaros en maquina',
    'remo al menton en polea': 'facepull',
    'press inclinado': 'press inclinado en maquina',
    'aperturas': 'aperturas con mancuerna',
    'cruce de poleas': 'cruces en polea desde abajo',
    'cruces de polea': 'cruces en polea desde abajo',
    'press militar': 'press militar con mancuerna',
    'sentadilla pendular': 'sentadilla hack',
    'extensiones de cuadriceps': 'extension de cuadriceps',
    'aductor': 'aductor en maquina',
    'curl de biceps con mancuernas': 'curl biceps mancuernas',
    'triceps en polea con cuerda': 'triceps en polea con cuerda',
    'curl de biceps en banco scott': 'curl arana',
    'curl banco scott': 'curl arana',
    'triceps tras nuca unilateral': 'press trasnuca con mancuerna a una mano',
    'curl martillo': 'curl martillo mancuernas',
    'fondos': 'fondos'
  };

  function buscarEjercicioEnBD(nombreOId) {
    if (!nombreOId) return null;
    // 1. Verificacion directa en mapa oficial por ID de la rutina
    if (MAPA_RUTINA_OFICIAL[nombreOId]) {
      var targetId = MAPA_RUTINA_OFICIAL[nombreOId];
      for (var k = 0; k < BASE_DATOS_EJERCICIOS.length; k++) {
        if (BASE_DATOS_EJERCICIOS[k].id === targetId) return BASE_DATOS_EJERCICIOS[k];
      }
    }
    // 2. Busqueda por ID directo en el catalogo
    for (var i = 0; i < BASE_DATOS_EJERCICIOS.length; i++) {
      if (BASE_DATOS_EJERCICIOS[i].id === nombreOId) return BASE_DATOS_EJERCICIOS[i];
    }
    // 3. Normalizacion de nombre
    var norm = normalizar(nombreOId);
    if (SINONIMOS[norm]) {
      norm = normalizar(SINONIMOS[norm]);
    }
    for (var j = 0; j < BASE_DATOS_EJERCICIOS.length; j++) {
      var ex = BASE_DATOS_EJERCICIOS[j];
      if (ex.id === norm || normalizar(ex.nombre) === norm) return ex;
    }
    // 4. Busqueda por subcadena
    for (var m = 0; m < BASE_DATOS_EJERCICIOS.length; m++) {
      var cand = BASE_DATOS_EJERCICIOS[m];
      var normCand = normalizar(cand.nombre);
      if (norm.indexOf(normCand) !== -1 || normCand.indexOf(norm) !== -1) return cand;
    }
    return null;
  }

  function obtenerEstadisticas() {
    var total = BASE_DATOS_EJERCICIOS.length;
    var disponibles = 0;
    var rehacer = 0;
    for (var i = 0; i < total; i++) {
      if (BASE_DATOS_EJERCICIOS[i].estado === 'disponible') disponibles++;
      else rehacer++;
    }
    return { total: total, disponibles: disponibles, rehacer: rehacer };
  }

  global.CGM_BASE_DATOS_EJERCICIOS = {
    lista: BASE_DATOS_EJERCICIOS,
    buscar: buscarEjercicioEnBD,
    estadisticas: obtenerEstadisticas,
    normalizar: normalizar,
    mapaOficial: MAPA_RUTINA_OFICIAL
  };
})(typeof window !== "undefined" ? window : this);

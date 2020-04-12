package fabrizio.softplan.cadastro;

import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CadastroApplicationTests {

/*    @Autowired
    WebController webController;

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    @Test
    void contextLoads() {
        assertThat(webController).isNotNull();
    }

    @Test
    void canAddPost() {
        assertThat(this.restTemplate.postForObject("http://localhost:" + port + "/post?user=teste&text=oi", null, Pessoa.class).getUser().equalsIgnoreCase("teste")).isTrue();
    }

    @Test
    void errorGettingID(){
        assertThat(this.restTemplate.getForEntity("http://localhost:" + port + "/post?id=999",null).getStatusCodeValue()==404).isTrue();
    }*/
}

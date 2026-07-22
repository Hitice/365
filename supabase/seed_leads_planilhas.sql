-- Gerado por scripts/importar-leads.mjs em 2026-07-22
-- Carga unica das planilhas de prospeccao (pasta /leads). Rode DEPOIS
-- da 0005_erp_core.sql. Guard por nome: rodar de novo nao duplica.

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Udiplásticos Injetados Com. e Ind.', '33.628.939/0001-54', null, null, 'Av. Farroupilhas 438, N. Sra. das Graças', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Injeção de artefatos de uso pessoal e doméstico | Oportunidade: Moldes de injeção em alumínio, reparo e ajuste de moldes, postiços',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Udiplásticos Injetados Com. e Ind.'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Vassouras Mendonça', null, null, null, 'vassourasmendonca.com.br', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Utilidades domésticas | Produz: Rodos, vassouras e materiais de limpeza (150+ itens desde 1995) | Oportunidade: Moldes de injeção p/ cabos, suportes e lâminas de rodo; peças em PEAD',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Vassouras Mendonça'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Repet Ind. de Embalagens e Frascos Plásticos', '09.170.802/0001-14', null, null, 'Rua dos Teófilos 201, Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Frascos e embalagens plásticas (sopro) | Oportunidade: Moldes de sopro em alumínio (aplicação clássica), reparo de cavidades',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Repet Ind. de Embalagens e Frascos Plásticos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Emplastic Ind. e Com. de Plásticos', '20.013.983/0001-08', null, null, 'Rua Maria Quitéria 96, Marta Helena - emplastic.com.br', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Embalagens de material plástico | Oportunidade: Moldes e ferramental, peças de máquina em PEAD',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Emplastic Ind. e Com. de Plásticos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Super''Sol Ind. e Com.', '02.389.045/0001-25', null, null, 'Rua Nivaldo Guerreiro Nunes 840, Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Embalagens plásticas | Oportunidade: Moldes de sopro/injeção, manutenção de ferramental',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Super''Sol Ind. e Com.'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', '4Planet (Alves Caetano Ind. e Com. de Plástico)', '48.137.157/0001-90', null, null, 'Rua Ceará 2900, Custódio Pereira', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Embalagens plásticas (empresa jovem) | Oportunidade: Primeiro ferramental próprio em alumínio, baixo investimento',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('4Planet (Alves Caetano Ind. e Com. de Plástico)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Alfa Ind. e Com. de Plásticos Injetados', null, null, null, 'Uberaba (enriquecer contato)', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Injeção de plásticos | Oportunidade: Moldes de injeção alumínio, postiços, reparo',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Alfa Ind. e Com. de Plásticos Injetados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Plastilar Utensílios e Equipamentos', '66.471.467/0001-28', null, null, 'Av. Floriano Peixoto 1461, N. Sra. Aparecida', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Utensílios e equipamentos plásticos (desde 1993) | Oportunidade: Moldes p/ linha de utensílios, peças usinadas em PEAD',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Plastilar Utensílios e Equipamentos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Brasil Borrachas', null, null, null, 'Av. Antônio Thomaz F. de Rezende 1370 - (34) 3233-7001', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Borracha e EVA | Produz: Artefatos de borracha e mantas EVA (desde 2001) | Oportunidade: Moldes p/ artefatos de borracha, facas e gabaritos de corte',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Brasil Borrachas'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Udiforte Ind. e Com.', '02.993.266/0001-08', null, null, 'Estr. Comunitária Neuza Rezende 4296, Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Artefatos plásticos p/ construção (maior do CNAE na cidade) | Oportunidade: Ferramental, matrizes de extrusão, peças de reposição usinadas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Udiforte Ind. e Com.'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Form Ind. Fabricação e Projetos', '33.254.986/0001-85', null, null, 'Av. Farroupilhas 438, N. Sra. das Graças', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Fabricação e projetos em plástico | Oportunidade: Parceria projeto+molde; usinagem de protótipos funcionais',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Form Ind. Fabricação e Projetos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Aya Cosméticos', null, null, null, 'Av. Com. Alexandrino Garcia 821, Marta Helena - ayacosmeticos.com.br', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Cosméticos e higiene | Produz: Terceirização de cosméticos (desde 2006) | Oportunidade: Peças de envase (estrelas, guias, roscas) em PEAD; gabaritos p/ frascos de clientes',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Aya Cosméticos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Uberlândia Refrescos (Coca-Cola)', null, null, null, 'Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Bebidas (franquia Coca-Cola) | Oportunidade: Estrelas, guias e sem-fins de garrafa em PEAD/PEUHMW p/ linhas de envase',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Uberlândia Refrescos (Coca-Cola)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Politrisa - Polietileno do Triângulo', null, null, null, 'Uberaba (enriquecer contato)', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Artefatos de polietileno | Oportunidade: Usinagem de PEAD é sua especialidade — moldes e peças acabadas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Politrisa - Polietileno do Triângulo'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'HRL Telhas e Artefatos', '30.568.285/0001-22', null, null, 'Rua Nivaldo Guerreiro Nunes 871, Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Telhas e artefatos plásticos p/ construção | Oportunidade: Matrizes e gabaritos, peças de reposição',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('HRL Telhas e Artefatos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Cocal Alimentos', null, null, null, 'Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Alimentos (maior indústria de transformação da cidade) | Oportunidade: Peças de desgaste em PEAD alimentício, guias e raspadores',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Cocal Alimentos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Start Química', null, null, null, 'Uberlândia (desde 1987)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Química e saneantes | Produz: Produtos de limpeza e higienização industrial | Oportunidade: Peças de linha de envase em PEAD, bicos e adaptadores usinados',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Start Química'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Sunquímica', null, null, null, 'sunquimica.com (40 anos)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Química e saneantes | Produz: Limpeza e higienização p/ laticínios, frigoríficos e indústrias | Oportunidade: Peças de envase e dosagem em PEAD, reposição de linha',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Sunquímica'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Basic 3D Print', '51.542.319/0001-80', null, null, 'Rua João Batista de Oliveira 107, Shopping Park', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Prototipagem | Produz: Impressão 3D | Oportunidade: Parceria: quando o cliente deles precisa escalar, entra o molde em alumínio',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Basic 3D Print'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Polyvin Plásticos e Derivados', null, null, null, 'Uberaba (maior de plásticos da cidade)', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Plásticos e derivados | Oportunidade: Ferramental e peças usinadas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Polyvin Plásticos e Derivados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'UDI Fibras Ind. e Com.', '14.071.808/0001-74', null, null, 'Rua José Rodrigues 65, Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Artefatos em fibra/plástico p/ construção | Oportunidade: Moldes e gabaritos p/ laminação, peças usinadas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('UDI Fibras Ind. e Com.'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Uberflex Ind. e Com. de Plásticos', null, null, null, 'Uberaba (enriquecer contato)', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Tubos e acessórios plásticos p/ construção | Oportunidade: Matrizes de extrusão, calibradores usinados',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Uberflex Ind. e Com. de Plásticos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'TM Máquinas', null, null, null, 'tmmaquinas.ind.br (25+ anos)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Metalmecânica e agro | Produz: Máquinas e equipamentos | Oportunidade: Usinagem terceirizada (overflow), buchas e peças em PEAD p/ máquinas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('TM Máquinas'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Terrano Implementos Agrícolas', null, null, null, 'Uberlândia (enriquecer contato)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Metalmecânica e agro | Produz: Implementos agrícolas | Oportunidade: Buchas, roletes e deslizantes em PEAD; usinagem de precisão',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Terrano Implementos Agrícolas'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Indústrias Suavetex', null, null, null, 'Uberlândia (enriquecer contato)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Cosméticos e higiene | Produz: Higiene pessoal (uma das maiores do setor na cidade) | Oportunidade: Peças de máquina de conversão, guias e formatos em PEAD',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Indústrias Suavetex'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Criare Cosméticos Ind. e Com.', '43.299.998/0001-80', null, null, 'Rua José Rezende 5731, Tibery', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Cosméticos e higiene | Produz: Cosméticos, perfumaria e higiene (2021) | Oportunidade: Peças de envase, gabaritos de rotulagem',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Criare Cosméticos Ind. e Com.'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Grind Plastic', null, null, null, 'Uberaba (enriquecer contato)', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Artefatos plásticos (pequeno porte) | Oportunidade: Molde acessível em alumínio p/ pequenas séries',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Grind Plastic'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Química Estrela', null, null, null, 'Distrito Industrial - quimicaestrela.com.br', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Química e saneantes | Produz: Soda cáustica e produtos de limpeza | Oportunidade: Peças resistentes a corrosão em PEAD p/ linha',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Química Estrela'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Vigor Alimentos', null, null, null, 'Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Laticínios | Oportunidade: Peças de desgaste em PEAD alimentício p/ linhas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Vigor Alimentos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Complastec Plásticos Técnicos', null, null, null, 'Av. Antônio Tomaz F. de Rezende 1380, N. Sra. das Graças', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Plásticos técnicos (ATENÇÃO: pode ser concorrente parcial em usinagem) | Oportunidade: Subcontratação mútua; moldes que eles não fazem',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Complastec Plásticos Técnicos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Lactalis (unidade queijos)', null, null, null, 'Uberlândia (em expansão até 2027)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Queijos (1.000 t/mês) | Oportunidade: Peças em PEAD alimentício p/ novas linhas em instalação',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Lactalis (unidade queijos)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Delplus', null, null, null, 'Uberlândia (enriquecer contato)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Cosméticos e higiene | Produz: Cosméticos (uma das maiores do setor na cidade) | Oportunidade: Peças de envase e gabaritos',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Delplus'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Safe Ind. e Com.', null, null, null, 'Uberaba (enriquecer contato)', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Artefatos plásticos (pequeno porte) | Oportunidade: Ferramental de baixo custo',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Safe Ind. e Com.'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Vassouras Radial', null, null, null, 'vassourasradial.com.br', null, 'MG (confirmar cidade)', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Utilidades domésticas | Produz: Vassouras, rodos, escovas e pás | Oportunidade: Moldes p/ cabos, suportes e cepas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Vassouras Radial'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Revalor Reciclagem e Embalagens', '37.421.026/0001-13', null, null, 'Rua Rafael L. X. Santos 219, Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Reciclagem e embalagens | Oportunidade: Peças de reposição p/ extrusoras e aglutinadores',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Revalor Reciclagem e Embalagens'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Plastferes', null, null, null, 'Rua Araguari, São Benedito, Uberaba', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Embalagens | Oportunidade: Ferramental e reposição',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Plastferes'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Interquim', null, null, null, 'interquim.ind.br', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Química e saneantes | Produz: Químicos p/ manutenção industrial | Oportunidade: Peças de envase; indicação mútua de clientes industriais',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Interquim'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Cargill (unidade Uberlândia)', null, null, null, 'Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Alimentos/ingredientes | Oportunidade: Peças de desgaste em PEAD (compras corporativas — ciclo longo)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Cargill (unidade Uberlândia)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'ATT Perfumaria e Cosméticos', null, null, null, 'Uberlândia (enriquecer contato)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Cosméticos e higiene | Produz: Perfumaria e cosméticos | Oportunidade: Peças de envase e gabaritos',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('ATT Perfumaria e Cosméticos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Perpétua Cosméticos', null, null, null, 'Facebook: perpetuacosmeticos', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Cosméticos e higiene | Produz: Cosméticos (pequeno porte) | Oportunidade: Peças de envase básicas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Perpétua Cosméticos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Embalagens Uberlândia (Embalagens UDI)', null, null, null, 'embalagensuberlandia.com.br (29 anos)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Canal indireto | Produz: Distribuidor de frascos p/ cosméticos e manipulação | Oportunidade: Canal: clientes que querem frasco exclusivo precisam de molde',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Embalagens Uberlândia (Embalagens UDI)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'CJ Selecta', null, null, null, 'Distrito Industrial', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Processamento de soja | Oportunidade: Peças de desgaste em PEAD p/ transporte de grãos',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('CJ Selecta'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Laticínios Porto Alegre (nova fábrica)', null, null, null, 'Patos de Minas (expansão R$ 200 mi)', null, 'Patos de Minas', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Laticínios | Oportunidade: Peças p/ novas linhas em instalação',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Laticínios Porto Alegre (nova fábrica)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'JMLI Recuperação de Plástico', null, null, null, 'Uberlândia (enriquecer contato)', null, 'Uberlândia', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Transformação plástica | Produz: Reciclagem de plástico | Oportunidade: Peças de reposição de máquinas',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('JMLI Recuperação de Plástico'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Smurfit Kappa Inpa', null, null, null, 'BR-050, Distrito Industrial 2, Uberaba', null, 'Uberaba', 'MG', 'industria', 'Mailing CNC Uberlândia', 'Segmento: Alimentos e bebidas | Produz: Embalagens de papel | Oportunidade: Facas, gabaritos e peças de máquina (multinacional — ciclo longo)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Smurfit Kappa Inpa'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Versalle Móveis Planejados', null, '(34) 9 9882-2755', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'Desde 1987',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Versalle Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'MJ Móveis Planejados e Marcenaria', null, '(34) 99119-0811', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'mjplanejados.com.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('MJ Móveis Planejados e Marcenaria'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria & Móveis Vilela', null, '(34) 99660-3932', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', null,
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria & Móveis Vilela'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Carvalho Móveis Planejados', null, '(34) 99693-1086', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'carvalhomoveisplanejados.udi.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Carvalho Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Móveis Planejados Uberlândia (Marcelo)', null, '(34) 99764-5757', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'moveisplanejadosuberlandia.com.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Móveis Planejados Uberlândia (Marcelo)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'FS Marcenaria', null, '(34) 99671-4744', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'fsmarcenaria.com.br · Bairro Tubalina',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('FS Marcenaria'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'RI Marcenaria', null, '(34) 98862-2051', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'Bairro Jardim Canaã',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('RI Marcenaria'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'All Premium Ambientes Planejados', null, '(34) 99207-8179', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'Bairro Granada',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('All Premium Ambientes Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'All Mais - Ambientes Planejados', null, '(34) 99195-2744', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'Fixo alternativo: (34) 3217-7059',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('All Mais - Ambientes Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria do Jaime', null, '(34) 98814-5594', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'marcenariadojaime.com.br · Av. Afonso Pena',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria do Jaime'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Pontual Móveis Planejados', null, '(34) 99969-1106', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias (WhatsApp)', 'Projetos em 3D',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Pontual Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria Ideale Ambientes Planejados', null, '(34) 3216-7408 (fixo)', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'Rua Rio Grande do Norte, 1417',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria Ideale Ambientes Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria Lamoplan', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'lamoplan.com.br · Av. Paulo Firmino, 651 - Jd. Holanda',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria Lamoplan'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'LGL Marcenaria', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'lglmarcenaria.com.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('LGL Marcenaria'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Five Elementos Móveis Planejados', null, '(34) 99636-XXXX (incompleto)', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'facebook.com/fiveelementosmoveis — confirmar número completo',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Five Elementos Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria 3 Irmãos', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'marcenaria3irmaos.site.com.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria 3 Irmãos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Italínea Daz (rede nacional)', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'italineadaz.com.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Italínea Daz (rede nacional)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Imoplan Móveis Planejados', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'imoplan.ueniweb.com',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Imoplan Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'União Mobile', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'uniaomobile.com.br',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('União Mobile'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Atalaia Móveis Planejados', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'Bairro Alto Umuarama · Mais de 20 anos no mercado',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Atalaia Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria Nova Art', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'Av. Dr. Laérte Vieira Gonçalves, 2014 - Santa Mônica',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria Nova Art'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'M & S Marcenaria Ltda', null, '(34) 3212-**** (fixo, parcial)', null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'Rua João Balbino, 1465 - Santa Mônica',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('M & S Marcenaria Ltda'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'M.s Marcenaria', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'Av. Edgard De Oliveira Castro, 50 - Conj. Alvorada',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('M.s Marcenaria'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria Moderna', null, null, null, null, null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção marcenarias', 'Rua Nêgo Amâncio, 719 - Jardim Patrícia',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria Moderna'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Art Design Gráfica e Comunicação Visual', null, '34932547205', null, 'Av. João Pinheiro, 2539', 'Brasil', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Gráfica e comunicação visual, bem avaliada por clientes | Site: graphicas.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Art Design Gráfica e Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Gráfica União', null, '(34) 3236-0731 / (34) 99862-7878', null, 'Rua Antônio Thomaz de Rezende, 215', 'Osvaldo Rezende', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Embalagens personalizadas, envelopamento de frotas, comunicação visual, estrutura produtiva própria | Site: uniaoindustriagrafica.com.br | CNC: Possível (estrutura produtiva própria) | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Gráfica União'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'UDIARTE - Comunicação Visual / Informática / Gráfica Rápida', null, '3433053351', null, 'R. Duque de Caxias, 1665', 'Saraiva', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual, informática e gráfica rápida | Site: graphicas.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('UDIARTE - Comunicação Visual / Informática / Gráfica Rápida'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'CRIART Gráfica e Comunicação Visual', null, '(34) 3237-1729', null, 'Av. Rio Branco, 40 (também consta Av. João Pessoa, 1160 - Martins)', 'Centro / Martins', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Gráfica e comunicação visual | Site: graphicas.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('CRIART Gráfica e Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Neosign Comunicação Visual', null, '(34) 3210-3500', 'contato@neosign.com.br (via formulário do site)', 'R. Bernardo Cupertino', 'Osvaldo Rezende', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Mais de 10 anos no mercado, projetos 3D, atende micro, médias e grandes empresas | Site: neosign.com.br | CNC: Não identificado | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Neosign Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Layout Comunicação Visual', null, '(34) 3212-0336', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Fachadas, letra caixa, ACM, sinalização, plotagem de veículos; possui maquinário próprio atualizado | CNC: Sim - cita maquinário próprio | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Layout Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Brascon Comunicação Visual', null, '(34) 3312-9400 / (34) 3305-0513 (também (34) 3211-6180)', 'contato@brascon... (via site)', 'Av. Profa. Minervina Cândida de Oliveira (também consta Av. Floriano Peixoto, 3960 - Brasil)', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Sinalização e comunicação visual, materiais que não agridem saúde/meio ambiente | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Brascon Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'UdiMais Comunicação / Mais Visual (responsável: Régis)', null, '(34) 98800-4457', 'udimaisvendas@gmail.com / maisvisualuberlandia@gmail.com', 'R. Sebastião Silveira Santos, 1081', 'Luizote de Freitas', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Adesivos, banners, fachada, impressão digital, plotagem, ACM, letras caixas, toldos | Site: facebook.com/UdiMaisComunicacao | CNC: Não identificado | Prioridade: Alta (contato direto do responsável)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('UdiMais Comunicação / Mais Visual (responsável: Régis)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'RC Comunicação Visual', null, '(34) 99693-1259', null, 'Rua Luiz Vieira Tavares, 646', 'Custódio Pereira', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Estrutura em metalon, ACM, letras caixa iluminadas, toldos, adesivos, plotagem | Site: rcuberlandia.com.br | CNC: Possível (estrutura metálica própria) | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('RC Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Guima Design / Guima Visual', null, '(34) 99776-5051', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Mais de 20 anos no mercado; fachadas ACM, letras caixa, totens, luminosos, plotagem de veículos | Site: guimavisual.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Guima Design / Guima Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Quality Comunicação Visual', null, '(34) 99122-8307', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Fachada em ACM com CORTE CNC, letras caixa, totem, toldos em policarbonato | Site: qualitycomunicacaovisual.com.br | CNC: Sim - corte CNC citado explicitamente | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Quality Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Atom Comunicação Visual', null, '(34) 99668-8637', null, 'Pacaembú', 'Pacaembú', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Fachadas, letra caixa, luminosos, envelopamento, papel de parede, blindex | Site: atomcomunicacaovisual.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Atom Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'LP Comunicação Visual', null, '(34) 99648-7939', null, 'Uberlândia - MG (atende também Uberaba e região)', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Placas e fachadas em ACM | Site: fachadasacmlp.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('LP Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'TOP * Ponto 4 Comunicação Visual e Sublimação Têxtil', null, '(34) 99891-4764', null, 'Rua Rio Grande do Sul, 337', 'Brasil', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual e sublimação têxtil | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('TOP * Ponto 4 Comunicação Visual e Sublimação Têxtil'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'RB Comunicação Visual Ltda', null, '(34) 3224-0707 / 34999884029', null, 'orozimbo ribeiro', 'santa monica', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Maior faturamento do setor em Uberlândia segundo Econodata | CNC: Não identificado | Prioridade: Alta (porte/faturamento)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('RB Comunicação Visual Ltda'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Facil de Imprimir Comunicação Visual Ltda', null, '(34) 3223-3159', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Entre as maiores do setor segundo Econodata | CNC: Não identificado | Prioridade: Alta (porte/faturamento)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Facil de Imprimir Comunicação Visual Ltda'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Vetor Comunicação Visual (Cardoso e Silva Indústria e Comércio de Comunicação Visual Ltda)', null, '34996535207', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Indústria e comércio de comunicação visual | CNC: Possível (atividade industrial) | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Vetor Comunicação Visual (Cardoso e Silva Indústria e Comércio de Comunicação Visual Ltda)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Global Comunicação Visual', null, '(34) 99682-1130', null, 'Rua Geraldo Garcia de Almeida, 116', 'Parque São Jorge I', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | Site: facebook.com/globalcomunicacaovisual | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Global Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'DC Digital Comunicação Visual', null, '(34) 3212-4966 / (34) 99990-7920', null, 'Av. Cesário Alvim, 3335', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Soluções para empreendimentos de clientes | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('DC Digital Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Public Comunicação Visual', null, '(34) 99975-1897', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | Site: hubt.com.br/public-comunicacao-visual | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Public Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Adesivos e Comunicação Visual JJ', null, '(34) 3215-2473 / 34 991941187', 'wandersonjj2011@hotmail.com', 'Av. Cleanto Vieira Gonçalves, 295', 'Roosevelt', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Adesivos e comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Adesivos e Comunicação Visual JJ'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Acril Udi Serviços Comunicação Visual', null, '(34) 3235-9270 / (34) 99765-0505', null, 'Av. Praça Izabel, 1213', 'Tabajaras', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual (nome sugere trabalho com acrílico) | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Acril Udi Serviços Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Dstar Comunicação Visual', null, '(34) 99234-6060', null, 'Avenida Ipê, 226', 'Jaraguá', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Dstar Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Imagem Comunicação Visual (unidade 1)', null, null, null, 'Rua Tenente Virmondes, 71', 'Centro', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Imagem Comunicação Visual (unidade 1)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Imagem Comunicação Visual (unidade 2)', null, null, null, 'Av. Cesário Alvim, 1970', 'Nossa Senhora Aparecida', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Imagem Comunicação Visual (unidade 2)'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'J.J. Comunicação Visual', null, '(34) 3222-1153  / 34 991941187', null, null, null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('J.J. Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'MB Dual Gráfica e Comunicação Visual', null, '(34) 3237-2600', null, 'Rua Arlindo Teixeira, 230', 'Centro', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Gráfica e comunicação visual | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('MB Dual Gráfica e Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Prime Comunicação Visual', null, '(34) 3222-3065', null, 'Av. Farroupilhas, 547', 'Nossa Senhora das Graças', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Prime Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Projjeta Comunicação Visual', null, '(34) 3084-7858', null, 'Rua Curitiba, 1056', 'Brasil', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Projjeta Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Reidys Comunicação Visual', null, '(34) 3213-2929  /  34998802596', null, 'Av. Cesário Alvim, 1968', 'Nossa Senhora Aparecida', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Reidys Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'RN Brindes e Comunicação Visual', null, '(34) 3222-9181', null, 'Av. Cesário Alvim, 4406', 'Custódio Pereira', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Brindes personalizados e comunicação visual | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('RN Brindes e Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Croma', null, '(34) 3304-2055  / 34999361095', null, null, null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Croma'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Única Comunicação Visual', null, '(34) 99187-0490', null, 'Av. Vasconcelos Costa, 1700', 'Daniel Fonseca', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Comunicação visual | CNC: Não identificado | Prioridade: Baixa',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Única Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'HG Projetos', null, '(34) 99718-0123', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Placas, letreiros, banners, faixas, sinalização interna/externa personalizada | Site: fachadasetoldosuberlandia.com.br | CNC: Não identificado | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('HG Projetos'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', '2mL Gráfica Expressa', null, '(34) 3236-3330  /  wpp', null, 'Av. Nicomedes Alves dos Santos, 27', 'Centro', 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Mais de 30 anos de experiência; comunicação impressa e visual, sinalização, brindes, fachada adesivada | Site: 2ml.com.br | CNC: Não identificado | Prioridade: Alta (porte/tradição)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('2mL Gráfica Expressa'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Gráfica Udi Cores - Comunicação Visual', null, '(34) 99227-0445', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Plotter lona/adesivo, plotter de recorte, offset, digital, serralheria, letreiros, placas e totens | Site: graficaudicores.com.br | CNC: Possível (serralheria própria) | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Gráfica Udi Cores - Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', '3m Comunicação Visual', null, '(34) 3237-6565 / (34) 99964-7437', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Placas, luminosos, letreiros, sinalização industrial, impressão 3D — USA MÁQUINAS LASER CNC E PLOTTERS PRÓPRIAS | Site: sgmcomvisual.com.br | CNC: Sim - cita expressamente ''Cortes e Gravações em Máquinas Laser CNC'' | Prioridade: Altíssima (usa CNC própria)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('3m Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Jet Comunicação Visual', null, '(34)99290-5476', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', 'Adesivos, placas, copos personalizados, gráfica | Site: jet-comunicacao-visual.ueniweb.com | CNC: Não identificado | Prioridade: Baixa/Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Jet Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Connect Comunicação Visual', null, '(34) 99666-0107', null, null, null, 'Uberlândia', 'MG', 'comunicacao_visual', 'Prospecção comunicação visual', null,
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Connect Comunicação Visual'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria Ideale Ambientes Planejados', null, '(34) 3216-7408', null, 'Rua Rio Grande do Norte, 1417', null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'Móveis planejados sob medida | Site: listamais.com.br | CNC: Provável (padrão do setor usa router CNC) | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria Ideale Ambientes Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria & Móveis Vilela', null, '(34) 99660-3932', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'Móveis planejados residenciais e comerciais | Site: marcenaria-e-moveis-vilela.ueniweb.com | CNC: Provável | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria & Móveis Vilela'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'LEMES Móveis Planejados', null, 'Ver WhatsApp no site', null, 'R. José Rezende, 4381', 'Custódio Pereira', 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'Móveis planejados, bem avaliada por clientes | Site: marcenarias.net.br | CNC: Provável | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('LEMES Móveis Planejados'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'RI Marcenaria', null, '(34) 98862-2051', null, 'Av. Jerusalém, 308', 'Jardim Canaã', 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'Móveis planejados | Site: marcenarias.net.br | CNC: Provável | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('RI Marcenaria'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'M & S Marcenaria Ltda', null, '(34) 3210-4186', null, 'Rua João Balbino, 1465', 'Santa Mônica', 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'No mercado desde 2008, móveis planejados | Site: solutudo.com.br | CNC: Provável | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('M & S Marcenaria Ltda'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Marcenaria do Jaime', null, '(34) 3222-8287 / (34) 98814-5594', 'marcenariadojaime@... (via site)', 'Bairro Umuarama', 'Umuarama', 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'Empresa familiar tradicional, planejados em MDF, desenvolve os próprios equipamentos segundo o site | Site: marcenariadojaime.com.br | CNC: Sim - site menciona desenvolvimento de equipamentos próprios | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Marcenaria do Jaime'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'UDICAR', null, '(34) 3222-0018', null, 'R. do Carpinteiro, 362', 'Planalto', 'Uberlândia', 'MG', 'marcenaria', 'Prospecção outros segmentos', 'Móveis planejados | Site: marcenarias.net.br | CNC: Provável | Prioridade: Média',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('UDICAR'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Triângulo Usinagem', null, '(34) 3211-5330', null, 'Av. Farroupilhas, 340', 'Nossa Senhora das Graças', 'Uberlândia', 'MG', 'industria', 'Prospecção outros segmentos', 'Desde 2007; especializada em peças para equipamentos agrícolas e industriais (plataformas Kemper, rotores Claas, equipamentos Oxbo); torneamento, fresamento, reforma de máquinas agrícolas e extrusoras | Site: triangulousinagem.com | CNC: Sim - CNC D1250 (4º eixo), CNC D600, Tornos CNC Centur 30D e GL 350 citados explicitamente | Prioridade: Altíssima (usa CNC própria + atua no seu nicho exato)',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Triângulo Usinagem'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'RMI Indústria e Usinagem', null, '(34) 3211-9014', null, 'Rua das Sementes, 1488', 'Minas Gerais', 'Uberlândia', 'MG', 'industria', 'Prospecção outros segmentos', 'Usinagem e serviços industriais: caldeiraria, manutenção, montagem | Site: rmiusinagem.com | CNC: Provável (usinagem industrial) | Prioridade: Alta',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('RMI Indústria e Usinagem'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'Central Máquinas Engenharia', null, '(34) 3213-... (ver CIMM)', null, 'Uberlândia - MG', null, 'Uberlândia', 'MG', 'industria', 'Prospecção outros segmentos', 'Desde 1995; sede própria com 6.000 m² construídos; centro de usinagem, consultoria para fabricação de novos produtos e projetos | Site: cimm.com.br | CNC: Sim - centro de usinagem próprio | Prioridade: Altíssima',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('Central Máquinas Engenharia'));

insert into public.empresas (status, nome_fantasia, cnpj, telefone, email, endereco, bairro, cidade, estado, nicho, origem, observacoes, responsavel_id)
select 'lead', 'GearTech Engenharia', null, 'Ver site (formulário)', null, 'Distrito Industrial', 'Distrito Industrial', 'Uberlândia', 'MG', 'industria', 'Prospecção outros segmentos', 'Mais de 20 anos; usinagem industrial CNC, fabricação mecânica, caldeiraria industrial, engenharia reversa, recuperação de redutores, cromo duro | Site: geartech.ind.br | CNC: Sim - usinagem CNC própria citada explicitamente | Prioridade: Altíssima',
  (select id from public.profiles where role = 'team_leader' order by created_at limit 1)
where not exists (select 1 from public.empresas where lower(nome_fantasia) = lower('GearTech Engenharia'));

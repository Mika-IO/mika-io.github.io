import streamlit as st
import pandas as pd
import os

# Configuração básica da página
st.set_page_config(page_title="Validação SAS vs Glue", layout="wide")

st.title("🔍 Comparação de Processos: SAS vs Glue")
st.write("Validação da coluna NMOTENCE referenciada pelo CDPASTA.")
st.divider()

caminho_sas = "PPR_TRIB_sas.tab" 
caminho_glue = "PPR_TRIB.tab"

# Colunas que queremos extrair (otimiza a memória ao ler arquivos de 185 colunas)
colunas_alvo = ['CDPASTA', 'NMOTENCE', 'SITUACAO']

@st.cache_data
def carregar_e_preparar_dados(caminho, nome_fonte):
    if not os.path.exists(caminho):
        st.error(f"Arquivo não encontrado: {caminho}")
        return None
    
    try:
        # Lê apenas as colunas necessárias, usando latin1 e tratando erros de encoding
        df = pd.read_csv(
            caminho, 
            sep='\t', 
            encoding='latin1', 
            encoding_errors='replace',
            usecols=colunas_alvo
        )
        
        # Garante a regra de 1 linha por processo (mantém a primeira ocorrência)
        df = df.drop_duplicates(subset=['CDPASTA'])
        
        return df
    except Exception as e:
        st.error(f"Erro ao processar o arquivo {nome_fonte}: {e}")
        return None

# Carrega os dois DataFrames
df_sas = carregar_e_preparar_dados(caminho_sas, "SAS")
df_glue = carregar_e_preparar_dados(caminho_glue, "Glue")

if df_sas is not None and df_glue is not None:
    
    # 1. Cálculo dos preenchidos (not null) na coluna NMOTENCE
    qtd_sas = df_sas['NMOTENCE'].notna().sum()
    qtd_glue = df_glue['NMOTENCE'].notna().sum()
    
    # Exibe os indicadores usando o componente metric do Streamlit
    st.subheader("📊 Indicadores de Preenchimento (NMOTENCE)")
    col1, col2 = st.columns(2)
    col1.metric(label="Preenchidos no SAS (Legado)", value=qtd_sas)
    col2.metric(label="Preenchidos no Glue (Novo)", value=qtd_glue, delta=int(qtd_glue - qtd_sas))
    
    st.divider()
    
    # 2. Mesclando as tabelas para visualização lado a lado pelo CDPASTA
    st.subheader("📋 Comparação Linha a Linha")
    
    # Outer join garante que veremos processos que existem em um mas não no outro
    df_comparacao = pd.merge(
        df_sas, 
        df_glue, 
        on='CDPASTA', 
        how='outer', 
        suffixes=('_SAS', '_GLUE')
    )
    
    # Reorganizando a ordem das colunas para facilitar a leitura visual
    ordem_colunas = [
        'CDPASTA', 
        'NMOTENCE_SAS', 'NMOTENCE_GLUE', 
        'SITUACAO_SAS', 'SITUACAO_GLUE'
    ]
    df_comparacao = df_comparacao[ordem_colunas]
    
    # Exibe a tabela mesclada
    st.dataframe(df_comparacao, use_container_width=True)

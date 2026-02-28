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

# Colunas alvo
colunas_alvo = ['CDPASTA', 'NMOTENCE', 'SITUACAO']

@st.cache_data
# Adicionamos o parâmetro 'codificacao' na função
def carregar_e_preparar_dados(caminho, nome_fonte, codificacao):
    if not os.path.exists(caminho):
        st.error(f"Arquivo não encontrado: {caminho}")
        return None
    
    try:
        df = pd.read_csv(
            caminho, 
            sep='\t', 
            encoding=codificacao, # Usa a codificação específica de cada arquivo
            encoding_errors='replace',
            usecols=colunas_alvo,
            dtype=str # Força leitura como texto para evitar que números do CDPASTA percam zeros à esquerda
        )
        
        # Garante a regra de 1 linha por processo
        df = df.drop_duplicates(subset=['CDPASTA'])
        
        return df
    except Exception as e:
        st.error(f"Erro ao processar o arquivo {nome_fonte}: {e}")
        return None

# ==========================================
# O Pulo do Gato: Encodings diferentes aqui
# ==========================================
df_sas = carregar_e_preparar_dados(caminho_sas, "SAS", codificacao='latin1')
df_glue = carregar_e_preparar_dados(caminho_glue, "Glue", codificacao='utf-8')

if df_sas is not None and df_glue is not None:
    
    qtd_sas = df_sas['NMOTENCE'].notna().sum()
    qtd_glue = df_glue['NMOTENCE'].notna().sum()
    
    st.subheader("📊 Indicadores de Preenchimento (NMOTENCE)")
    col1, col2 = st.columns(2)
    col1.metric(label="Preenchidos no SAS (Legado)", value=qtd_sas)
    col2.metric(label="Preenchidos no Glue (Novo)", value=qtd_glue, delta=int(qtd_glue - qtd_sas))
    
    st.divider()
    
    st.subheader("📋 Comparação Linha a Linha")
    
    df_comparacao = pd.merge(
        df_sas, 
        df_glue, 
        on='CDPASTA', 
        how='outer', 
        suffixes=('_SAS', '_GLUE')
    )
    
    ordem_colunas = [
        'CDPASTA', 
        'NMOTENCE_SAS', 'NMOTENCE_GLUE', 
        'SITUACAO_SAS', 'SITUACAO_GLUE'
    ]
    df_comparacao = df_comparacao[ordem_colunas]
    
    st.dataframe(df_comparacao, use_container_width=True)

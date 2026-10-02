# 🚢 Titanic — Análise e Predição de Sobrevivência com Machine Learning

![Titanic](Titanic.png)

> Projeto de ciência de dados que aplica técnicas de análise exploratória e algoritmos de Machine Learning para prever a sobrevivência de passageiros do Titanic com base em características socioeconômicas e demográficas.

---

## 📌 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pipeline do Projeto](#-pipeline-do-projeto)
- [Algoritmos de Machine Learning](#-algoritmos-de-machine-learning)
- [Avaliação dos Modelos](#-avaliação-dos-modelos)
- [Como Executar](#-como-executar)

---

## 📖 Sobre o Projeto

O desafio do Titanic é um dos projetos mais clássicos de aprendizado de máquina. O objetivo é construir um modelo preditivo capaz de responder à pergunta:

> **"Que tipos de pessoas tinham mais chances de sobreviver ao naufrágio do Titanic?"**

A partir do dataset histórico com 891 passageiros, exploramos padrões nos dados, tratamos valores ausentes, criamos novas variáveis e treinamos **5 algoritmos de classificação** para identificar o modelo com melhor acurácia preditiva.

---

## 🛠️ Tecnologias Utilizadas

| Biblioteca | Finalidade |
|---|---|
| **Python 3.x** | Linguagem principal |
| **Pandas** | Manipulação e análise de dados |
| **NumPy** | Operações numéricas |
| **Matplotlib** | Visualização de gráficos |
| **Seaborn** | Visualização estatística avançada |
| **Scikit-learn** | Algoritmos de Machine Learning |
| **Jupyter Notebook** | Ambiente de desenvolvimento interativo |

---

## 📁 Estrutura do Projeto

```
TitanicNew/
│
├── base.ipynb                    # Notebook principal com todo o pipeline
├── train.csv                     # Dataset de treino (891 passageiros)
├── Titanic.png                   # Imagem ilustrativa
├── Guia_Pratico_ML_Titanic.docx  # Documentação complementar
└── README.md                     # Este arquivo
```

---

## 🔄 Pipeline do Projeto

### 1. Carregamento dos Dados

```python
df = pd.read_csv('train.csv')
```

O dataset `train.csv` contém **891 registros** com as seguintes colunas principais:

| Coluna | Descrição |
|---|---|
| `Survived` | Sobreviveu? (0 = Não, 1 = Sim) — **variável alvo** |
| `Pclass` | Classe do bilhete (1ª, 2ª ou 3ª classe) |
| `Sex` | Sexo do passageiro |
| `Age` | Idade |
| `SibSp` | Nº de irmãos/cônjuges a bordo |
| `Parch` | Nº de pais/filhos a bordo |
| `Fare` | Valor da passagem |
| `Embarked` | Porto de embarque (C, Q ou S) |
| `Cabin` | Cabine (muitos valores ausentes — removida) |

---

### 2. Análise Exploratória (EDA)

Foram gerados **4 gráficos** para entender os padrões dos dados:

- **Gráfico 1 — Taxa de Sobrevivência por Classe (Pclass):** Revela que passageiros da 1ª classe tinham taxa de sobrevivência muito maior do que os da 3ª classe.
- **Gráfico 2 — Taxa de Sobrevivência por Sexo:** Demonstra a regra "mulheres e crianças primeiro" — mulheres sobreviveram em proporção muito maior.
- **Gráfico 3 — Distribuição de Idade (KDE Plot):** Compara a distribuição etária entre sobreviventes e não sobreviventes.
- **Gráfico 4 — Matriz de Correlação (Heatmap):** Visualiza correlações entre variáveis numéricas para identificar features relevantes.

---

### 3. Tratamento de Dados

| Coluna | Estratégia | Justificativa |
|---|---|---|
| `Age` | Substituído pela **mediana** | Valor valioso; mediana é robusta a outliers |
| `Embarked` | Substituído pela **moda** | Apenas 2 linhas faltantes |
| `Cabin` | **Coluna removida** | Mais de 77% de valores ausentes |

```python
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])
df = df.drop(columns='Cabin')
```

---

### 4. Engenharia de Features

Foram criadas **2 novas variáveis**:

#### `familySize` — Tamanho da Família
```python
df['familySize'] = df['SibSp'] + df['Parch'] + 1
```
Representa o total de membros da família a bordo. Famílias muito grandes podem ter tido maior dificuldade no resgate.

#### `isAlone` — Viajou Sozinho?
```python
df['isAlone'] = (df['familySize'] == 1).astype(int)
```
Flag binária que indica se o passageiro embarcou desacompanhado.

#### Features Finais
```python
features = ['Age', 'Embarked', 'Pclass', 'Sex', 'familySize', 'isAlone', 'Fare']
```
As variáveis categóricas `Sex` e `Embarked` foram convertidas via **One-Hot Encoding**.

#### Divisão Treino/Teste
```python
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
# 80% treino (~712) | 20% teste (~179)
```

---

### 5. Treinamento e Avaliação dos Modelos

Todos os modelos foram treinados no conjunto de treino e avaliados no conjunto de teste usando acurácia, relatório de classificação e matriz de confusão.

---

## 🤖 Algoritmos de Machine Learning

### 🌳 Árvore de Decisão (`DecisionTreeClassifier`)

**O que é:** Cria uma estrutura de perguntas binárias em cascata dividindo os dados de acordo com os atributos mais informativos até chegar a uma decisão.

```python
DecisionTreeClassifier(max_depth=4, random_state=42, class_weight='balanced')
```

**Propósito no projeto:**
- Serviu como **modelo base (baseline)** para comparação
- `max_depth=4` limita a profundidade para evitar overfitting
- `class_weight='balanced'` compensa o desbalanceamento entre classes
- Permite visualizar a matriz de confusão com clareza

---

### 📈 Regressão Logística (`LogisticRegression`)

**O que é:** Algoritmo de **classificação** que modela a probabilidade de uma amostra pertencer a uma classe usando a função sigmoide.

```python
LogisticRegression(max_iter=1000, random_state=42)
```

**Propósito no projeto:**
- Modelo linear e **interpretável**, ideal para entender o peso de cada feature
- Fornece probabilidades de sobrevivência para cada passageiro
- Bom ponto de referência por ser simples e eficiente

---

### 🌲 Random Forest (`RandomForestClassifier`)

**O que é:** Algoritmo de **ensemble** que cria múltiplas árvores de decisão com subconjuntos aleatórios dos dados, combinando as previsões de todas elas por votação majoritária.

```python
RandomForestClassifier(n_estimators=100, random_state=42)
```

**Propósito no projeto:**
- Normalmente apresenta **maior acurácia** entre os modelos testados
- Utilizado também para gerar o gráfico de **importância das variáveis** (`feature_importances_`)
- Robusto a overfitting em comparação à Árvore de Decisão simples

---

### 👥 K-Nearest Neighbors (`KNeighborsClassifier`)

**O que é:** Classifica um ponto novo com base na classe dos **k vizinhos mais próximos** no espaço de features (distância euclidiana).

```python
KNeighborsClassifier(n_neighbors=5)
```

**Propósito no projeto:**
- Abordagem baseada em **similaridade** entre passageiros
- Demonstra como a proximidade no espaço de features pode prever sobrevivência
- Sensível à escala dos dados e ao valor de k

---

### 🔷 Support Vector Machine (`SVC`)

**O que é:** Encontra o **hiperplano ótimo** que separa as classes com a maior margem possível no espaço de features.

```python
SVC(random_state=42)
```

**Propósito no projeto:**
- Eficaz em espaços de alta dimensionalidade
- Testa uma abordagem de maximização de margem como alternativa aos modelos baseados em árvore

---

## 📊 Avaliação dos Modelos

### Métricas utilizadas

| Métrica | O que mede |
|---|---|
| **Acurácia** | Percentual total de predições corretas |
| **Precision** | Dos previstos como sobreviventes, quantos realmente sobreviveram |
| **Recall** | Dos que realmente sobreviveram, quantos o modelo identificou |
| **F1-Score** | Média harmônica entre Precision e Recall |
| **Matriz de Confusão** | Tabela com VP, VN, FP e FN para análise visual dos erros |

### Importância das Variáveis (Random Forest)

As variáveis mais determinantes para a predição foram:

- 💰 **Fare** — proxy do status socioeconômico
- 🚻 **Sex_male** — fator decisivo ("mulheres e crianças primeiro")
- 🎂 **Age** — crianças eram priorizadas no resgate
- 🎟️ **Pclass** — classe social do bilhete

---

## ▶️ Como Executar

### Pré-requisitos

```bash
pip install pandas numpy matplotlib seaborn scikit-learn notebook
```

### Execução

```bash
# Clone o repositório
git clone https://github.com/Gahbx/Titanic-Dataset.git
cd Titanic-Dataset

# Inicie o Jupyter Notebook
jupyter notebook base.ipynb
```

Execute as células em ordem sequencial. Todo o pipeline está documentado no notebook `base.ipynb`.

---

## 👤 Autor

**Gabriel** — [@Gahbx](https://github.com/Gahbx)

---

*Projeto desenvolvido como estudo prático de Machine Learning com o dataset clássico do Titanic (Kaggle).*

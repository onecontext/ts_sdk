import * as OneContext from 'onecontext'
import fs from "fs";
import YAML from 'yaml';
import * as dotenv from "dotenv";
import { PipelineSchema } from "onecontext";
// import {runMany} from "../rmUtils";

// import the variables from the .env
dotenv.config({ path: __dirname + '/../.env' });

// make sure they are being read correctly and instantiate as global variables
const API_KEY: string = process.env.API_KEY!;
const BASE_URL: string = process.env.BASE_URL!;
const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY!;

// define a default yaml, and an override yaml
const path = __dirname + "/../example_yamls/simple.yaml"
const overridePath = __dirname + "/../example_yamls/wildcards.yaml"
const file: string = fs.readFileSync(path, 'utf8')
const overrideFile: string = fs.readFileSync(overridePath, 'utf8')


const util = require('util')


// const parsed = OneContext.parseYaml({
//     yaml: overrideFile,
//     verboseErrorHandling: true,
//     overrides: {
//         wildcardOverrides: {
//             "$RERANKER_QUERY_WILDCARD": "transformer architectures and how they apply to large language models",
//             "$RERANKER_TOP_K_WILDCARD": "5",
//             "$QUERY_QUERY": "transformer architectures and how they apply to large language models",
//             "$QUERY_TOP_K": "20",
//         }
//     },
//     asString: true
// }).then((res) => {
//     // create a yaml out of the object response
//     if (typeof res === "string") {
//         const runArgs: OneContext.RunArgsType = {
//             pipelineName: 'retainit_example',
//             override_oc_yaml: res,
//             BASE_URL: BASE_URL,
//             API_KEY: API_KEY
//         }
//         OneContext.run(runArgs).then((res) => {
//             console.log(res)
//         })
//     }
//     else { console.log("error in response") }
// })


// Run the topics  pipeline
//

const overridePathTopics = __dirname + "/../example_yamls/topics.yaml"
const overrideFileTopics: string = fs.readFileSync(overridePathTopics, 'utf8')

const parsed = OneContext.parseYaml({
    yaml: overrideFileTopics,
    verboseErrorHandling: true,
    asString: true
}).then((res) => {
    // create a yaml out of the object response
    if (typeof res === "string") {
        const runArgs: OneContext.RunArgsType = {
            pipelineName: 'retainit_example',
            override_oc_yaml: res,
            BASE_URL: BASE_URL,
            API_KEY: API_KEY
        }
        OneContext.submitRun(runArgs).then((res) => {
            console.log(util.inspect(res, {showHidden: false, depth: null, colors: true}))
        })
    }
    else { console.log("error in response") }
})

// Update the metadata

// const overridePathUpdateMeta = __dirname + "/../example_yamls/update_metadata.yaml"
// const overrideFileUpdateMeta: string = fs.readFileSync(overridePathUpdateMeta, 'utf8')

// const parsed = OneContext.parseYaml({
//     yaml: overrideFileUpdateMeta,
//     verboseErrorHandling: true,
//     asString: true
// }).then((res) => {

//     // create a yaml out of the object response
//     if (typeof res === "string") {
//         const runArgs: OneContext.RunArgsType = {
//             pipelineName: 'retainit_example',
//             override_oc_yaml: res,
//             BASE_URL: BASE_URL,
//             API_KEY: API_KEY
//         }
//         OneContext.run(runArgs).then((res) => {
//             console.log(util.inspect(res, {showHidden: false, depth: null, colors: true}))
//         })
//     }
//     else { console.log("error in response") }
// })


// const parsed = OneContext.parseYaml({
//     yaml: overrideFile,
//     verboseErrorHandling: true,
//     overrides: {
//         wildcardOverrides: {
//             "$RERANKER_QUERY_WILDCARD": "transformer architectures and how they apply to large language models",
//             "$RERANKER_TOP_K_WILDCARD": "20",
//             "$QUERY_QUERY": "transformer architectures and how they apply to large language models",
//             "$QUERY_TOP_K": "80",
//         }
//     },
//     asString: true
// }).then((res) => {
//         if (typeof res === "string") {
//             const quizPipeArgs: OneContext.QuizPipeArgType = {
//                 pipelineName: 'retainit_example',
//                 overrideOcYaml: res,
//                 BASE_URL: BASE_URL,
//                 API_KEY: API_KEY,
//                 OPENAI_API_KEY: OPENAI_API_KEY,
//                 promptPerTopic: "Please create a multiple choice quiz for me about the topic of {topic}. Base the questions in your quiz on the information contained in the following pieces of text: {chunks}. There should be {num_questions_topic} questions on this topic. For each multiple choice question, include 1 correct answer, and 3 plausible (but incorrect) answers. Clearly state which is the correct answer at the end of each question.",
//                 clusterLabel: "louvain_retainit.label",
//                 totalNumQuestions: 8,
//             }
//             OneContext.quizPipe(quizPipeArgs).then((res) => {
//                 console.log(res)
//             })
//         } else {
//         }
//     }
// )


// // run the query pipeline. here we are passing the override yaml we defined above
// const queryArgs: OneContext.QuerySingleArgType = {
//     pipelineName: 'retainit_example',
//     override_oc_yaml: file,
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY
// }
// OneContext.query(queryArgs).then((res) => {
//     console.log(res)
// })

// list your current pipelines
// const listPipes: OneContext.ListPipelinesType = {BASE_URL: BASE_URL, API_KEY: API_KEY, verbose: false}
// OneContext.listPipelines(listPipes).then((res)=>{console.log(res)})

// create a pipeline
//
// const pipeCreate: OneContext.PipelineCreateType = {pipelineName: 'retainit_example', pipelineYaml: file, BASE_URL: BASE_URL, API_KEY: API_KEY}
// const a = OneContext.createPipeline(pipeCreate).then((res)=>{console.log(res)})

// upload a file through the pipeline
// const uploadDirectoryArgs: OneContext.UploadDirectoryType = {
//     directory: "/Users/serge/pdfs_test/",
//     metadataJson: {"user_created": true},
//     pipelineName: "retainit_example",
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY,
// }
// OneContext.uploadDirectory(uploadDirectoryArgs).then((res) => {
//     console.log(res)
// })

 // const uploadFileArgs: OneContext.UploadFileType = {
 //     files: [{path: "/Users/serge/pdfs/some.txt"} ],
 //     metadataJson: {"description": "hello"},
 //     pipelineName: "retainit_example",
 //     BASE_URL: BASE_URL,
 //     API_KEY: API_KEY,
 //     stream: false
 // }
 // OneContext.uploadFile(uploadFileArgs).then((res) => {
 //     console.log(res)
 // })


// check on how that's going
// const checkPipelineArgs: OneContext.CheckPipelineType = {pipelineName: "retainit_example", BASE_URL: BASE_URL, API_KEY: API_KEY}
// OneContext.checkPipelineStatus(checkPipelineArgs).then((res)=>{console.log(res)})

// look at the statuses of files you have uploaded through the pipeline
//
// const listFiles: OneContext.ListFilesType = {pipelineName: 'retainit_example', BASE_URL: BASE_URL, API_KEY: API_KEY}
// OneContext.listFiles(listFiles).then((res)=>{console.log(res)})

// get chunks associated with this pipeline
// const getChunksArgs: OneContext.GetChunksType = {
//     pipelineName: 'retainit_example',
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY,
//     top_k: 200
// }
//
// OneContext.getChunks(getChunksArgs).then((res) => {console.log(res)})



// // submit pipeline run
// const callPipeArgs: OneContext.CallPipelineType = {
//     pipelineName: "rm-dev", overrideOcYaml: overrideFile,
//     BASE_URL: BASE_URL, API_KEY: API_KEY
// }
// OneContext.callPipelineHooks(callPipeArgs).then((res) => {console.log(res)})

// check on the progress of the hooks you called
// const checkHooksArgs: OneContext.CheckHooksType = {pipelineName: "rm-dev", callId: "5f94d10e69da41c0b2b5d1fad4309202", BASE_URL: BASE_URL, API_KEY: API_KEY}
// OneContext.checkHooksCall(checkHooksArgs).then((res) => {console.log(res)})

// now that the hooks have run successfully, you can now filter and group on the labels
// that have been generated by the hooks
// note that scorePercentileLabel and clusterLabel are different here than they were above
// const generateQuizArgs: OneContext.GenerateQuizType = {
//     userPromptPerTopic: "Please create a multiple choice quiz for me about the topic of {topic}. Base the questions in your quiz on the information contained in the following pieces of text: {chunks}. There should be {num_questions_topic} questions on this topic. For each multiple choice question, include 1 correct answer, and 3 plausible (but incorrect) answers. Clearly state which is the correct answer at the end of each question.",
//     metaDataFilters: {"file_name": {"$in": ["Implicit_representations.pdf"]}},
//     pipelineName: "rm-dev",
//     scorePercentileLabel: "lexranker_global.percentile_score",
//     clusterLabel: "louvain_global.label",
//     totalNumberOfQuestions: 8,
//     extractPercentage: 0.8,
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY,
//     OPENAI_API_KEY: OPENAI_API_KEY
// }
// OneContext.generateQuiz(generateQuizArgs).then((res) => {
//     console.log(res)
// })

// you can also decide to run a function which blocks until your embeddings are ready
// const uploadFileArgs: OneContext.UploadFileType = {
//     files: [{path: "/Users/rossmurphy/embedpdf/faith_and_fate.pdf"}],
//     metadataJson: {"description": "hello"},
//     pipelineName: "rm-dev",
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY,
//     stream: false
// }
// OneContext.uploadFile(uploadFileArgs).then((res) => {
//     console.log(res)
// })
// const awaitEmbeddingArgs: OneContext.AwaitEmbeddingsType = {pipelineName: "rm-dev", fileName: "faith_and_fate.pdf", BASE_URL: BASE_URL, API_KEY: API_KEY}
// OneContext.awaitEmbeddings(awaitEmbeddingArgs).then((res)=>{console.log(res)})

// const genQuestArgs: OneContext.GenerateQuestOptionsType = {
//     vision: "I want to know all about the generalisation capability of large language models",
//     mission: "I want to be able to have a discussion with Kevin Murphy about the topic of large language models",
//     quest: "I want to understand the content of the book Faith and Fate",
//     introPrompt: "Please generate for me a quest that is full of learning content that will enable me in my goal: {quest}. I want to achieve my mission: {mission}, vision {vision}. Some excerpts from the book faith and fate are {chunks}",
//     introContextBudget: 1200,
//     quizTotalContextBudget: 8000,
//     promptPerTopic: "Please create a multiple choice quiz for me about the topic of {topic}. Base the questions in your quiz on the information contained in the following pieces of text: {chunks}. There should be {num_questions_topic} questions on this topic. For each multiple choice question, include 1 correct answer, and 3 plausible (but incorrect) answers. Clearly state which is the correct answer at the end of each question.",
//     metaDataFilters: {"file_name": {"$in": ["faith_and_fate.pdf"]}},
//     pipelineName: "rm-dev",
//     totalNumberOfQuestions: 8,
//     scorePercentileKey: "lexranker_file.percentile_score",
//     clusterLabelKey: "louvain.label",
//     chunksLimit: 30,
//     model: "gpt-4-1106-preview",
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY,
//     OPENAI_API_KEY: OPENAI_API_KEY
// }
// OneContext.generateQuest(genQuestArgs).then((res) => {
//     console.log(res)
// })

// const contextCompleteArgs: OneContext.ContextCompletionArgsType = {
//     BASE_URL: BASE_URL,
//     API_KEY: API_KEY,
//     OPENAI_API_KEY: OPENAI_API_KEY,
//     pipelineName: "rm-dev",
//     prompt: "I want to know all about the generalisation capability of large language models. Include data from {chunks}",
//     contextTokenBudget: 1000,
//     maxTokens: 2000,
//     scorePercentileKey: "lexranker_file.percentile_score",
// }
// OneContext.contextCompletion(contextCompleteArgs).then((res) => {
//     console.log(res)
// })

// delete the pipeline
// note that doing this will also delete all the associated files, embeddings, and chunks
// const pipeDelete: OneContext.PipelineDeleteType = {pipelineName: 'rm-dev', BASE_URL: BASE_URL, API_KEY: API_KEY}
// OneContext.deletePipeline(pipeDelete).then((res)=>{console.log(res)})



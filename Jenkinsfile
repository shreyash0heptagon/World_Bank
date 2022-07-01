#!/usr/bin/env groovy
def DOCKER_REGISTRY = '760440466011.dkr.ecr.ap-south-1.amazonaws.com'
def projectName = "worldbank-fetchr".toLowerCase()
def MajorVersion = '1'
def scmRes
def TAG
def revision
def appImage
def allowedEnvs = [env.BRANCH_NAME]
def ECR_USER = "AWS-ECR"
def PROD = "no"
node {

    properties([
            parameters([
                choice(name: 'env', description: 'Environment to create Image', choices: allowedEnvs),
            ])
        ])

    stage('Change Branch') {
        ECR_TAG = params.env
        deleteDir()
        scmRes = checkout scm
        ID = UUID.randomUUID().toString()[-12..-1]
        APP_TAG = "app_${MajorVersion}.${currentBuild.id}-${ID}"
        revision = "${currentBuild.id}"
    }

    stage('Remove - Git Directory') {
        sh "echo '${scmRes.GIT_COMMIT}' > .revision"
        sh 'rm -fr .git'
    }

    stage("Create ENV File") {
        withCredentials([
            string(credentialsId: "${params.env}_REACT_APP_BASE_URL", variable: 'REACT_APP_BASE_URL'),
       ]) {
           writeFile (file: '.env', text: """REACT_APP_BASE_URL = '${REACT_APP_BASE_URL}',
            """
            )
         }
    }

    stage('Docker :: Build') {
         appImage = docker.build("${DOCKER_REGISTRY}/${projectName}:${APP_TAG}", "--no-cache -f Dockerfile .")
    }

    stage ('Docker :: Push') {
        docker.withRegistry("https://${DOCKER_REGISTRY}/${projectName}", "ecr:ap-south-1:${ECR_USER}") {
          appImage.push("${ECR_TAG}")
        }
    }

    stage('Docker :: Remove Image') {
        sh "docker rmi -f ${DOCKER_REGISTRY}/${projectName}:${APP_TAG}"
     }
}
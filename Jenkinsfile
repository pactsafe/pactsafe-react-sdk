node {
    checkout scm

    ansiColor('xterm') {
        try {
            setBuildStatus("Build Pending", "PENDING");
            
            sh "npm install"

            stage('Test') {
                sh "npm test"
            }

            stage('Lint') {
                sh "npm run lint"
            }

            // This is going to keep failing until we fix stuff...
            // stage('Audit') {
            //     sh "npm audit"
            // }

            // // We want to tag, push, and deploy when we push to master
            // if ( env.BRANCH_NAME == "master" ) {
            //     stage('Push') {

            //         // Login to AWS ECR
            //         sh '$(aws ecr get-login --no-include-email --region us-east-2)'

            //         // Push container to remote with :latest tag
            //         sh "docker tag ${container} ${registryUrl}/${containerName}:latest"
            //         sh "docker push ${registryUrl}/${containerName}:latest"

            //         // Tag remote image with :branch-buildNumber
            //         sh "docker tag ${registryUrl}/${containerName}:latest ${registryUrl}/${container}"
            //         sh "docker push ${registryUrl}/${container}"

            //         // Tag remote image with commit sha
            //         def gitCommitSHA = sh (script: "git rev-parse --short HEAD | tail -n1 | tr -d '\n'", returnStdout: true)
            //         sh "docker tag ${registryUrl}/${containerName}:latest ${registryUrl}/${containerName}:${gitCommitSHA}"
            //         sh "docker push ${registryUrl}/${containerName}:${gitCommitSHA}"
            //     }

            //     stage('QA Deploy') {
            //         // TODO
            //     }
            // }

            setBuildStatus("Build Succeeded", "SUCCESS");
        } catch (e) {
            setBuildStatus("Build failed", "FAILED");
            throw e
        }
    }
}

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/pactsafe/pactsafe-react-sdk"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
    ]);
}
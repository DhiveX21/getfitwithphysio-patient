pipeline{
    agent {
        node {
            label "fe"
        }
    }
    stages {
        stage("Build"){
            steps{
                echo 'BUILD EXECUTION STARTED'
                sh "sudo su root"
                sh "whoami"
                sh 'exec $SHELL'
                sh 'exec $SHELL'
                sh "node -v"
                sh "npm install"
                sh "yarn install"
                sh "npm run build"
            }
        }
    }
}
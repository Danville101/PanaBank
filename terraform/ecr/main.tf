resource "aws_ecr_repository" "panad_bank_ECR" {
     name =  "panad_bank_ECR_prod"
     image_tag_mutability =  "MUTABLE"
     image_scanning_configuration {
       scan_on_push = true
     }
  
}


#Look into Karpenter for auto sclaing of the cluster itself !!!!

#Look into Fluentbit for streaming of logs or other data to S3
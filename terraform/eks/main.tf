module "vpc" {
     source = "../vpc"
     
}

resource "aws_eks_cluster" "panda_bank_eks" {
     role_arn = aws_iam_role.eks_iam_role.arn
   name = "panda_bank_eks_cluster"
   vpc_config {
    subnet_ids =  module.vpc.subnet_ids 
   }
}


data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["eks.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "eks_iam_role" {
  name               = "eks-cluster-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "example-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.eks_iam_role.name
}


resource "aws_iam_role_policy_attachment" "example-AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.eks_iam_role.name
}


resource "aws_eks_node_group" "panad_bank_node_group" {
  cluster_name =  aws_eks_cluster.panda_bank_eks.name

node_role_arn       = aws_iam_role.node_group_role.arn
  subnet_ids          = module.vpc.subnet_ids 
  ami_type            = "AL2_x86_64"
  instance_types      = "t3.mico"
  capacity_type       = "ON_DEMAND"
  disk_size           = 20

  tags = {
    Environment = "production"
    Team        = "engineering"
  }

  remote_access {
    ec2_ssh_key = "ec2_key_pair"
  }

  scaling_config {
    desired_size = 3
    min_size     = 1
    max_size     = 5
  }

  launch_template {
    id = aws_launch_template.example.id
    version = "$Latest"
  }

  taint {
    key    = "dedicated"
    value  = "special"
    effect = "NO_SCHEDULE"
}
}



resource "aws_iam_role" "node_group_role" {
  name = "eks-node-group-role"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node_group_role.name
}

resource "aws_iam_role_policy_attachment" "AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node_group_role.name
}

resource "aws_iam_role_policy_attachment" "AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node_group_role.name
}
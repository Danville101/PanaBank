resource "aws_vpc" "panda_bank_vpc" {
  
  cidr_block = "10.0.0.0/16"
  instance_tenancy = "default"

  tags = {
     "Name" = "panda_bank_vpc"
  }
}

resource "aws_internet_gateway" "panda_bank_igw" {
  vpc_id = aws_vpc.panda_bank_vpc.id
  tags = {
     "Name"= "panad_bank_IGW"
     }
}

resource "aws_subnet" "public_subnet" {
     vpc_id =  aws_vpc.panda_bank_vpc.id
     cidr_block = "10.0.1.0/24"


}



resource "aws_route_table" "public_route_table" {
     vpc_id = aws_vpc.panda_bank_vpc.id
  route{ 
     cidr_block =  "0.0.0.0/0"
     gateway_id =  aws_internet_gateway.panda_bank_igw.id

  }
}

resource "aws_route_table_association" "public_route_table_association" {
  route_table_id =  aws_route_table.public_route_table.id
  subnet_id =  aws_subnet.public_subnet
}

resource "aws_network_acl" "public_nacl" {
  vpc_id =  aws_vpc.panda_bank_vpc.id
  egress {
     protocol =  "tcp"
     rule_no =  100
     action =  "allow"
     cidr_block =  "0.0.0.0/0"
     from_port =  443
     to_port =  433

  }
  ingress {
     protocol =  "tcp"
     rule_no =  100
     action =  "allow"
     cidr_block =  "0.0.0.0/0"
     from_port =  443
     to_port =  433

  }

  ingress {
     protocol =  "-1"
     rule_no =  200
     action =  "deny"
     cidr_block =  "0.0.0.0/0"
     from_port =  443
     to_port =  433

  }
  egress {
     protocol =  "-1"
     rule_no =  200
     action =  "deny"
     cidr_block =  "0.0.0.0/0"
     from_port =  0
     to_port =  0

  }




}

resource "aws_network_acl_association" "public_nacl_association" {
   network_acl_id =  aws_network_acl.public_nacl.id
  subnet_id = aws_subnet.public_subnet.id

}

variable "availability_zones" {
     type =  list(string)
     default = [ "us-east-1a", "us-east-1b", "us-east-1c" ]
  
}


resource "aws_subnet" "private_subnet" {
     vpc_id =  aws_vpc.panda_bank_vpc.id
     count =  3
     cidr_block = "10.0.${count.index}.0/24"
     availability_zone = element(var.availability_zones,count.index)
    

}
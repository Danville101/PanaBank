output "vpc_id" {
  value = aws_vpc.panda_bank_vpc.id
}

output "subnet_ids" {


  value ={
      for idx, subnet in  aws_subnet.private_subnet : idx => aws_subnet.aws_subnet.private_subnet.id
  }
}
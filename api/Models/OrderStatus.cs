﻿using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public enum OrderStatusEnum
    {
        PAID,
        UNPAID,
        OK,
        PENDING,
        WITH_BALANCE,
        QUOTE_OR_CHECK,
        FOR_LOA_OR_INVOICE
    }

    public class OrderStatus : IDBEntity<OrderStatus>
    {
        [Key]
        public OrderStatusEnum Id{ get; set; }
        [Required]
        public string Name { get; set; } = "";

        public override void AssignTo(OrderStatus other)
        {
            Id = other.Id;
            Name = other.Name;
        }
    }
}